from pathlib import Path

from django.conf import settings
from django.test import TestCase
from django.urls import reverse

TESTING_RESOURCES_PATH = Path(
    settings.BASE_DIR, "pydis_site", "apps", "resources", "tests", "testing_resources"
)


class TestResourcesView(TestCase):
    def test_resources_index_200(self):
        """Check does index of resources app return 200 HTTP response."""
        url = reverse("resources:index")
        response = self.client.get(url)
        self.assertEqual(response.status_code, 200)
