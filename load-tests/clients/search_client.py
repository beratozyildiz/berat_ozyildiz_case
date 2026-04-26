from utils.headers import get_headers

class SearchClient:

    def __init__(self, client):
        self.client = client

    def search(self, query: str):
        with self.client.get(
            f"/arama?q={query}",
            headers=get_headers(),
            name="N11 Search (Protected)",
            catch_response=True
        ) as response:

            if response.status_code == 200:
                response.success()
            else:
                response.failure(f"Search failed ({response.status_code})")

    def search_page(self, query: str, page: int):
        with self.client.get(
            f"/arama?q={query}&pg={page}",
            headers=get_headers(),
            name="N11 Search Pagination (Protected)",
            catch_response=True
        ) as response:

            if response.status_code == 200:
                response.success()
            else:
                response.failure(f"Pagination failed ({response.status_code})")