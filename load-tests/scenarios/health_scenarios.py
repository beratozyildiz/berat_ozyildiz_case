class HealthScenarios:

    def __init__(self, client):
        self.client = client

    def basic_health(self):
        self.client.health()