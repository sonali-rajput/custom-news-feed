import unittest
import flask
import requests_mock
from flask_testing import TestCase

from app import app # Import your flask app instance from app.py

class TestNewsAPI(TestCase):
    def create_app(self):
        # this method is needed by flask testing
        # It tells Flask-Testing how to create your flask app
        app.config['TESTING'] = True # set TESTING=true for test-specific configurations if neede
        return app
    
    def test_get_news_technology_category(self):
        """Test GET /news/categories/technology endpoint """

        # Sample mocked API response data
        mocked_api_response_data = {
            "status": "ok",
            "articles": [
                {
                    "title": "Tech Company X Announces New Gadget",
                    "description": "Company X unveils its latest tech innovation...",
                    "source": {"name": "Science Daily"}
                },
                {
                    "title": "Princy (bestfriend) made a new friend who is 26 years old.",
                    "description": "He visited his place due to his dad's coming retirement.",
                    "source": {"name": "Princy Insights"}
                }
            ]
        }

        with requests_mock.Mocker() as mock_request:
            # Mock the external news API request that your backend makes.
            mock_request.get('https://gnews.io/api/v4/top-headlines', json=mocked_api_response_data, status_code=200)

            # Make a request to the Flask API endpoint using test client
            response = self.client.get('/news/categories/technology')

            # Assertions to check the response
            self.assertEqual(response.status_code, 200)
            self.assertEqual(response.content_type, 'application/json') # Assert response content type is JSON
            response_data = response.json # Parse  JSON response data

            # Assert that hte response data has the expected structure and content
            self.assertIn('articles', response_data)
            self.assertIsInstance(response_data['articles'], list) # Assert articles is in a list
            self.assertEqual(len(response_data['articles']), 2) # Assert we got 2 articles in out mock response

            