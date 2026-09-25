FROM python:3.13-bookworm

ARG DEBIAN_FRONTEND=noninteractive
ARG STEMLAB_BUILD_REF=local
ARG TORCH_INDEX_URL=https://download.pytorch.org/whl/cu130
ARG TORCH_VERSION=2.14.0
ARG TORCHAUDIO_VERSION=2.11.0

ENV PIP_DISABLE_PIP_VERSION_CHECK=1 \
    PIP_NO_CACHE_DIR=1 \
    PYTHONUNBUFFERED=1 \
    STEMLAB_BUILD_REF=${STEMLAB_BUILD_REF} \
    HF_HOME=/root/.cache/huggingface \
    TORCH_HOME=/root/.cache/torch \
    VAMP_PATH=/root/.vamp

RUN apt-get update && apt-get install -y --no-install-recommends \
    bash \
    build-essential \
    ca-certificates \
    curl \
    ffmpeg \
    git \
    libasound2 \
    libfftw3-double3 \
    libfftw3-dev \
    libegl1 \
    libgl1 \
    libopengl0 \
    libglib2.0-0 \
    libgomp1 \
    libjack-jackd2-0 \
    libsamplerate0 \
    libsndfile1 \
    libsndfile1-dev \
    libx11-6 \
    libxcb-cursor0 \
    libxext6 \
    libxkbcommon-x11-0 \
    libxrender1 \
    procps \
    unzip \
    wget \
    xdotool \
    xvfb \
    && rm -rf /var/lib/apt/lists/*

COPY docker/requirements.lock.txt /opt/stemlab-docker/requirements.lock.txt
COPY docker/install-sonic-annotator.sh /opt/stemlab-docker/install-sonic-annotator.sh
COPY docker/install-vamp-pack.sh /opt/stemlab-docker/install-vamp-pack.sh
COPY docker/verify-environment.sh /opt/stemlab-docker/verify-environment.sh
COPY docker/entrypoint.sh /opt/stemlab-docker/entrypoint.sh
COPY docker/start-web-service.sh /opt/stemlab-docker/start-web-service.sh

RUN chmod +x /opt/stemlab-docker/*.sh

# Mirror the known-working environment's version numbers. The CUDA service uses
# the corresponding CUDA 13.0 wheels instead of the host's CPU torch wheel.
RUN python -m pip install --upgrade pip setuptools wheel \
    && python -m pip install \
        --index-url "${TORCH_INDEX_URL}" \
        "torch==${TORCH_VERSION}" \
        "torchaudio==${TORCHAUDIO_VERSION}"

# The exact top-level versions below are taken from the supplied working
# Windows environment snapshot. madmom-prebuilt has a CPython 3.13 manylinux
# wheel, avoiding the fragile source/Cython build of historical madmom.
RUN python -m pip install -r /opt/stemlab-docker/requirements.lock.txt

# Install the external binary analysis stack before copying project source so
# normal code changes do not invalidate these comparatively expensive layers.
RUN /opt/stemlab-docker/install-sonic-annotator.sh \
    && /opt/stemlab-docker/install-vamp-pack.sh

# Build the image from the exact checkout supplied as the Docker build context.
# This makes local Docker builds test uncommitted changes and makes CI publish
# exactly the source that actions/checkout supplied, without re-cloning GitHub.
COPY . /opt/stemlab
RUN python -m pip install --no-deps -e /opt/stemlab \
    && printf '%s\n' "${STEMLAB_BUILD_REF}" > /opt/stemlab-installed-ref.txt \
    && stemlab --help >/dev/null \
    && /opt/stemlab-docker/verify-environment.sh --build

WORKDIR /work
ENTRYPOINT ["/opt/stemlab-docker/entrypoint.sh"]
