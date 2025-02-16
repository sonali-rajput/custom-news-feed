from flask import Flask, jsonify, request
import requests
import os
from dotenv import load_dotenv
import datetime
import logging
from flask_cors import CORS


load_dotenv()


app = Flask(__name__)

CORS(app)

logging.basicConfig(level=logging.ERROR,
                    format='%(asctime)s - %(levelname)s - %(message)s')


@app.route('/news/categories')
def get_default_news_categories():
    news = get_news_from_gnews_api("general")
    if news and "error" not in news:
        return jsonify(news)
    else:
        return jsonify({"error": "Failed to fetch news from Gnews API"}), 500





@app.route('/news/categories/<category_names>')
def get_news_by_categories(category_names):

    from_date_str = request.args.get('from_date')
    to_date_str = request.args.get('to_date')

    news = get_news_from_gnews_api(category=category_names, from_date=from_date_str, to_date=to_date_str)
    
    if news and "error" not in news:
        return jsonify(news)
    else:
        return jsonify({"error": "Failed to fetch news from Gnews API"}), 500



def get_news_from_gnews_api(category="general", from_date=None, to_date=None):
    api_key= os.getenv("GNEWS_API_KEY")

    base_url = "https://gnews.io/api/v4/top-headlines"  # Back to top-headlines endpoint
    params={
        "apikey": api_key,
        "category": category,
        "lang": "en",
        "max": 5
    }

    if from_date:
        try:
            datetime.datetime.strptime(from_date, '%Y-%m-%d')
            params["from"] = f"{from_date}T00:00:00Z"
        except ValueError:
            logging.error(f"Invalid from_date format: {from_date}. Expected YYYY-MM-DD")
            return {"error": "Invalid from_date format. Expected YYYY-MM-DD"}, 400
        
    if to_date:
        try:
            datetime.datetime.strptime(to_date, '%Y-%m-%d')
            params["to"] = f"{to_date}T00:00:00Z"
        except ValueError:
            logging.error(f"Invalid to_date format: {to_date}. Expected YYYY-MM-DD")
            return {"error": "Invalid to_date format. Expected YYYY-MM-DD"}, 400


    try:
        response = requests.get(base_url, params=params)
        response.raise_for_status() # Raise HTTP error for bad response
        news_data = response.json() # Parse json response
        return news_data
    except requests.exceptions.RequestException as e:
        print(f"Error fetching news from Gnews API: {e}")
        return {"error": "Failed to fetch news from Gnews API"} # return an empty dictionary or, handle the error as needed












if __name__=='__main__':
    app.run(debug=True) # we use debug is true so whatever changes we make to our flask it will refelect to the app running as well.

    






