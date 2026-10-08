FROM python:3.11-bookworm

ARG DEBIAN_FRONTEND=noninteractive
ARG STEMLAB_BUILD_REF=local
ARG TORCH_INDEX_URL=https://download.pytorch.org/whl/cu130
ARG TORCH_VERSION=2.14.0
ARG TORCHAUDIO_VERSION=2.11.0
ARG TORCHVISION_VERSION=0.29.1

LABEL org.opencontainers.image.title="StemLab" \
      org.opencontainers.image.description="Local music analysis for stems, timing, beats, harmony, lyrics, MIDI and loopable sections for Shorts. https://kieransimkin.co.uk/" \
      org.opencontainers.image.authors="Kieran Simkin" \
      org.opencontainers.image.url="https://kieransimkin.co.uk/" \
      org.opencontainers.image.documentation="https://github.com/kieransimkin/stemlab#readme" \
      org.opencontainers.image.source="https://github.com/kieransimkin/stemlab" \
      uk.co.kieransimkin.my-songs="https://kieransimkin.co.uk/my-songs/" \
      uk.co.kieransimkin.arcadians="https://kieransimkin.co.uk/arcadians/" \
      io.danceflow.component="StemLab" \
      io.danceflow.related-plugin="DanceMoves" \
      io.danceflow.workflow="BPM and motion response"

ENV PIP_DISABLE_PIP_VERSION_CHECK=1 \
    PIP_NO_CACHE_DIR=1 \
    PYTHONUNBUFFERED=1 \
    STEMLAB_BUILD_REF=${STEMLAB_BUILD_REF} \
    HF_HOME=/root/.cache/huggingface \
    TORCH_HOME=/root/.cache/torch \
    VAMP_PATH=/root/.vamp

RUN apt-get -o Acquire::Retries=3 update \
    && apt-get -o Acquire::Retries=3 install -y --no-install-recommends \
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

# Pin the PyTorch family independently so CUDA and CPU wheel indexes can be selected.
# The CUDA service uses
# the corresponding CUDA 13.0 wheels instead of the host's CPU torch wheel.
RUN python -m pip install --upgrade pip setuptools wheel \
    && python -m pip install \
        --index-url "${TORCH_INDEX_URL}" \
        "torch==${TORCH_VERSION}" \
        "torchaudio==${TORCHAUDIO_VERSION}" \
        "torchvision==${TORCHVISION_VERSION}"

# Top-level runtime versions are pinned in docker/requirements.lock.txt for a
# deterministic container build.
# Python 3.11 keeps Basic Pitch's TensorFlow runtime available while retaining
# modern wheels for madmom-prebuilt and every other StemLab backend.
RUN python -m pip install -r /opt/stemlab-docker/requirements.lock.txt

COPY docker/install-sonic-annotator.sh /opt/stemlab-docker/install-sonic-annotator.sh
COPY docker/install-vamp-pack.sh /opt/stemlab-docker/install-vamp-pack.sh
COPY docker/verify-environment.sh /opt/stemlab-docker/verify-environment.sh
COPY docker/entrypoint.sh /opt/stemlab-docker/entrypoint.sh
COPY docker/start-web-service.sh /opt/stemlab-docker/start-web-service.sh

# Git attributes keep shell scripts LF-only in fresh checkouts. Normalise again
# in the image so builds from an existing Windows working tree are safe too.
RUN sed -i 's/\r$//' /opt/stemlab-docker/*.sh \
    && chmod +x /opt/stemlab-docker/*.sh

# Install the external binary analysis stack before copying project source so
# normal code changes do not invalidate these comparatively expensive layers.
RUN /opt/stemlab-docker/install-sonic-annotator.sh \
    && /opt/stemlab-docker/install-vamp-pack.sh

# Build the image from the exact checkout supplied as the Docker build context.
# This makes local Docker builds test uncommitted changes and makes CI publish
# exactly the source that actions/checkout supplied, without re-cloning GitHub.
COPY . /opt/stemlab
RUN python -m pip install --no-deps -e /opt/stemlab \
    && stemlab bootstrap beatnet \
    && printf '%s\n' "${STEMLAB_BUILD_REF}" > /opt/stemlab-installed-ref.txt \
    && stemlab --help >/dev/null \
    && /opt/stemlab-docker/verify-environment.sh --build

WORKDIR /work
ENTRYPOINT ["/opt/stemlab-docker/entrypoint.sh"]
