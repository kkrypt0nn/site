from django.contrib import admin
from django.urls import include, path


urlpatterns = (
    path('admin/', admin.site.urls),

    # External API ingress (over the net)
    path('api/', include('pydis_site.apps.api.urls', namespace='api')),
    # Internal API ingress (cluster local)
    path('pydis-api/', include('pydis_site.apps.api.urls', namespace='internal_api')),

    # This must be mounted before the `content` app to prevent Django
    # from wildcard matching all requests to `pages/...`.
    path('', include('pydis_site.apps.redirect.urls')),
    path('pages/', include('pydis_site.apps.content.urls', namespace='content')),
    path('resources/', include('pydis_site.apps.resources.urls')),
    path('events/', include('pydis_site.apps.events.urls', namespace='events')),
    path('staff/', include('pydis_site.apps.staff.urls', namespace='staff')),
    path('', include('pydis_site.apps.home.urls', namespace='home')),
)
