import os
import requests
from datetime import datetime, timedelta
import json

# This script fetches real crypto news from CryptoCompare API
# and inserts them into the Supabase database

CRYPTOCOMPARE_API_KEY = "your_api_key_here"  # Free tier available
SUPABASE_URL = os.environ.get("SUPABASE_URL")
SUPABASE_SERVICE_KEY = os.environ.get("SUPABASE_SERVICE_ROLE_KEY")

def fetch_crypto_news():
    """Fetch latest crypto news from CryptoCompare"""
    url = "https://min-api.cryptocompare.com/data/v2/news/?lang=EN"
    
    try:
        response = requests.get(url)
        response.raise_for_status()
        data = response.json()
        
        if data.get("Response") == "Success":
            return data.get("Data", [])[:50]  # Get top 50 news
        return []
    except Exception as e:
        print(f"Error fetching news: {e}")
        return []

def determine_sentiment(title, body):
    """Simple sentiment analysis based on keywords"""
    positive_words = ['surge', 'rally', 'gain', 'bullish', 'growth', 'rise', 'up', 'high', 'profit', 'success']
    negative_words = ['crash', 'drop', 'fall', 'bearish', 'loss', 'decline', 'down', 'low', 'risk', 'warning']
    
    text = (title + " " + body).lower()
    
    positive_count = sum(1 for word in positive_words if word in text)
    negative_count = sum(1 for word in negative_words if word in text)
    
    if positive_count > negative_count:
        return 'positive'
    elif negative_count > positive_count:
        return 'negative'
    return 'neutral'

def insert_news_to_supabase(news_items):
    """Insert news into Supabase database"""
    if not SUPABASE_URL or not SUPABASE_SERVICE_KEY:
        print("Missing Supabase credentials")
        return
    
    headers = {
        "apikey": SUPABASE_SERVICE_KEY,
        "Authorization": f"Bearer {SUPABASE_SERVICE_KEY}",
        "Content-Type": "application/json",
        "Prefer": "resolution=merge-duplicates"
    }
    
    url = f"{SUPABASE_URL}/rest/v1/news"
    
    for item in news_items:
        news_data = {
            "title": item.get("title", ""),
            "description": item.get("body", "")[:500],  # First 500 chars as description
            "content": item.get("body", ""),
            "image_url": item.get("imageurl", ""),
            "source": item.get("source", "CryptoCompare"),
            "author": item.get("source", "Unknown"),
            "url": item.get("url", ""),
            "published_at": datetime.fromtimestamp(item.get("published_on", 0)).isoformat(),
            "category": item.get("categories", "General").split("|")[0] if item.get("categories") else "General",
            "sentiment": determine_sentiment(item.get("title", ""), item.get("body", ""))
        }
        
        try:
            response = requests.post(url, headers=headers, json=news_data)
            if response.status_code in [200, 201]:
                print(f"✓ Inserted: {news_data['title'][:50]}...")
            else:
                print(f"✗ Failed: {response.status_code} - {response.text[:100]}")
        except Exception as e:
            print(f"Error inserting news: {e}")

def main():
    print("Fetching crypto news...")
    news_items = fetch_crypto_news()
    
    if news_items:
        print(f"Found {len(news_items)} news articles")
        print("Inserting into database...")
        insert_news_to_supabase(news_items)
        print("Done!")
    else:
        print("No news items found")

if __name__ == "__main__":
    main()
