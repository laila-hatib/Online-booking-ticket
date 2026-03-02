import os
from pathlib import Path
from urllib.parse import urlparse

BASE_DIR = Path(__file__).resolve().parent.parent


def get_bool(value, default=False):
    if value is None:
        return default
    return str(value).strip().lower() in {"1", "true", "yes", "on"}


def get_list(value, default=None):
    if not value:
        return default or []
    return [item.strip() for item in str(value).split(",") if item.strip()]


SECRET_KEY = os.getenv(
    "DJANGO_SECRET_KEY",
    "django-insecure-4s!_2!1gjqa_67mwt75p2$tfe1s!8_14+#&j=o=(fq8)uq8g$x",
)

DEBUG = get_bool(os.getenv("DJANGO_DEBUG"), default=False)

ALLOWED_HOSTS = get_list(
    os.getenv("DJANGO_ALLOWED_HOSTS"),
    default=["localhost", "127.0.0.1"],
)

render_hostname = os.getenv("RENDER_EXTERNAL_HOSTNAME")
if render_hostname:
    ALLOWED_HOSTS.append(render_hostname)


CORS_ALLOW_ALL_ORIGINS = get_bool(os.getenv("CORS_ALLOW_ALL_ORIGINS"), default=False)
CORS_ALLOWED_ORIGINS = get_list(
    os.getenv("CORS_ALLOWED_ORIGINS"),
    default=["https://online-booking-ticket.vercel.app"],
)
CSRF_TRUSTED_ORIGINS = get_list(os.getenv("CSRF_TRUSTED_ORIGINS"), default=[])

INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'OnlinebookingApp',
    'rest_framework',
    'drf_yasg',
    'corsheaders',
]

MIDDLEWARE = [
    'corsheaders.middleware.CorsMiddleware',
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]

ROOT_URLCONF = 'Onlinebookingproject.urls'

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]

WSGI_APPLICATION = 'Onlinebookingproject.wsgi.application'


DATABASE_URL = os.getenv("DATABASE_URL")
if DATABASE_URL:
    parsed = urlparse(DATABASE_URL)
    DATABASES = {
        'default': {
            'ENGINE': 'django.db.backends.postgresql',
            'NAME': parsed.path.lstrip('/'),
            'USER': parsed.username,
            'PASSWORD': parsed.password,
            'HOST': parsed.hostname,
            'PORT': parsed.port or 5432,
        }
    }
else:
    DATABASES = {
        'default': {
            'ENGINE': os.getenv('DB_ENGINE', 'django.db.backends.postgresql'),
            'NAME': os.getenv('DB_NAME', 'aboud_db'),
            'USER': os.getenv('DB_USER', 'postgres'),
            'PASSWORD': os.getenv('DB_PASSWORD', 'laila'),
            'HOST': os.getenv('DB_HOST', 'localhost'),
            'PORT': os.getenv('DB_PORT', '5432'),
        }
    }



AUTH_PASSWORD_VALIDATORS = [
    {
        'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator',
    },
]


LANGUAGE_CODE = 'en-us'

TIME_ZONE = 'UTC'

USE_I18N = True

USE_TZ = True


STATIC_URL = 'static/'
STATIC_ROOT = BASE_DIR / 'staticfiles'

CORS_ALLOWED_ORIGINS = [
    'https://online-booking-ticket.vercel.app'
]
CORS_ALLOWED_ORIGIN_ALL = True
SECURE_PROXY_SSL_HEADER = ('HTTP_X_FORWARDED_PROTO', 'https')

