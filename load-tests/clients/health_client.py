from utils.headers import get_headers

class HealthClient:

    def __init__(self, client):
        self.client = client

    def health(self):
        with self.client.get(
            "/get",
            headers=get_headers(),
            name="Health Check",
            catch_response=True
        ) as response:

            if response.status_code == 200:
                response.success()
            else:
                response.failure(f"Health failed ({response.status_code})")