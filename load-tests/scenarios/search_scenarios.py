import random
from config.settings import SEARCH_TERMS

class SearchScenarios:

    def __init__(self, client):
        self.client = client

    def basic_search(self):
        query = random.choice(SEARCH_TERMS)
        self.client.search(query)

    def empty_search(self):
        self.client.search("")

    def special_search(self):
        self.client.search("@#$%^")

    def pagination(self):
        self.client.search_page("phone", 2)