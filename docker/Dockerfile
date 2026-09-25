FROM python:3.13-bookworm

ARG DEBIAN_FRONTEND=noninteractive
ARG STEMLAB_REPO=https://github.com/kieransimkin/stemlab.git
ARG STEMLAB_REF=latest
ARG TORCH_INDEX_URL=https://download.pytorch.org/whl/cu130
ARG TORCH_VERSION=2.14.0
ARG TORCHAUDIO_VERSION=2.11.0

ENV PIP_DISABLE_PIP_VERSION_CHECK=1 \
    PIP_NO_CACHE_DIR=1 \
    PYTHONUNBUFFERED=1 \
    STEMLAB_REPO=${STEMLAB_REPO} \
    STEMLAB_REF=${STEMLAB_REF} \
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
    jq \
    libasound2 \
    libfftw3-double3 \
    libfftw3-dev \
    libegl1 \
    libgl1 \
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
COPY docker/install-stemlab.sh /opt/stemlab-docker/install-stemlab.sh
COPY docker/verify-environment.sh /opt/stemlab-docker/verify-environment.sh
COPY docker/entrypoint.sh /opt/stemlab-docker/entrypoint.sh
COPY docker/start-web-service.sh /opt/stemlab-docker/start-web-service.sh

RUN chmod +x /opt/stemlab-docker/*.sh

# Keep torch/torchaudio internally matched in Docker even though the original
# working Windows snapshot contained torch 2.14.0+cpu with torchaudio 2.11.0.
# Matching binaries avoid ABI surprises while preserving the same torch series.
RUN python -m pip install --upgrade pip setuptools wheel \
    && python -m pip install \
        --index-url "${TORCH_INDEX_URL}" \
        "torch==${TORCH_VERSION}" \
        "torchaudio==${TORCHAUDIO_VERSION}"

# The exact top-level versions below are taken from the supplied working
# Windows environment snapshot. madmom-prebuilt has a CPython 3.13 manylinux
# wheel, avoiding the fragile source/Cython build of historical madmom.
RUN python -m pip install -r /opt/stemlab-docker/requirements.lock.txt

RUN /opt/stemlab-docker/install-sonic-annotator.sh \
    && /opt/stemlab-docker/install-vamp-pack.sh \
    && /opt/stemlab-docker/install-stemlab.sh \
    && /opt/stemlab-docker/verify-environment.sh --build

WORKDIR /work
ENTRYPOINT ["/opt/stemlab-docker/entrypoint.sh"]
