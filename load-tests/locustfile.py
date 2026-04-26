from locust import HttpUser, task, between, tag
from clients.search_client import SearchClient
from clients.health_client import HealthClient
from scenarios.search_scenarios import SearchScenarios
from scenarios.health_scenarios import HealthScenarios
from config.settings import BASE_URL, HEALTHCHECK_URL

class N11User(HttpUser):
    wait_time = between(2, 5)
    host = BASE_URL

    def on_start(self):
        # Search (target system)
        self.search_client = SearchClient(self.client)
        self.search_scenarios = SearchScenarios(self.search_client)

        # Health (control system)
        self.health_client = HealthClient(self.client)
        self.health_scenarios = HealthScenarios(self.health_client)

    @task(3)
    @tag("n11")
    def search(self):
        self.search_scenarios.basic_search()

    @task(1)
    @tag("n11")
    def pagination(self):
        self.search_scenarios.pagination()

    @task(1)
    @tag("health")
    def health(self):
        # switch to control endpoint
        self.client.base_url = HEALTHCHECK_URL
        self.health_scenarios.basic_health()
        self.client.base_url = BASE_URL