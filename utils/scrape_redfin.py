import requests
from bs4 import BeautifulSoup
import pandas as pd
import os
from urllib.parse import urljoin, urlparse
import base64
import mimetypes

def scrape_redfin_property(url, output_file):
    headers = {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
        'Accept-Language': 'en-US,en;q=0.5',
        'Accept-Encoding': 'gzip, deflate, br',
        'DNT': '1',
        'Connection': 'keep-alive',
        'Upgrade-Insecure-Requests': '1',
    }
    
    try:
        response = requests.get(url, headers=headers, timeout=30)
        response.raise_for_status()
        
        # Parse HTML with BeautifulSoup to extract unit details
        soup = BeautifulSoup(response.text, 'html.parser')
        
        # Extract unit information using improved parsing
        unit_data = []
        
        # Look for unit type sections (Unit Type 1 to 10)
        for i in range(1, 11):
            header = soup.find('div', string=lambda text: text and f'Unit Type {i}' in text)
            if not header:
                continue
                
            ul = header.find_parent('ul')
            if not ul:
                continue

            unit = {
                "Unit Type": f"Unit Type {i}",
                "Beds": None,
                "Baths": None,
                "Rent": None,
                "Furnished": None,
                "Num Units": None,
                "Actual Rent": None
            }

            for li in ul.find_all('li'):
                label = li.text.strip()

                if 'Total # of Beds:' in label:
                    unit['Beds'] = label.split(':')[-1].strip()
                elif 'Total # of Baths:' in label:
                    unit['Baths'] = label.split(':')[-1].strip()
                elif 'Actual Rent:' in label:
                    unit['Actual Rent'] = label.split(':')[-1].strip().replace(',', '')
                elif 'Total Rent:' in label:
                    unit['Rent'] = label.split(':')[-1].strip().replace(',', '')
                elif 'Furnished:' in label:
                    unit['Furnished'] = label.split(':')[-1].strip()
                elif 'Total # of Units:' in label:
                    unit['Num Units'] = label.split(':')[-1].strip()

            unit_data.append(unit)

        # Convert to DataFrame and display
        if unit_data:
            unit_df = pd.DataFrame(unit_data)
            print("Extracted Unit Information:")
            print(unit_df.to_string(index=False))
            print()
        else:
            print("No unit data found")
        
        # Save as MHTML format
        mhtml_content = f"""MIME-Version: 1.0
Content-Type: multipart/related; boundary="----MultipartBoundary--redfin--"

------MultipartBoundary--redfin--
Content-Type: text/html; charset=UTF-8
Content-Transfer-Encoding: quoted-printable
Content-Location: {url}

{response.text}

------MultipartBoundary--redfin----
"""
        
        with open(output_file, 'w', encoding='utf-8') as f:
            f.write(mhtml_content)
        
        print(f"Successfully scraped and saved to: {output_file}")
        return True
        
    except requests.exceptions.RequestException as e:
        print(f"Error scraping URL: {e}")
        return False

if __name__ == "__main__":
    url = "https://www.redfin.com/CA/Garden-Grove/10802-Palma-Vista-Ave-92840/home/3396137"
    output_file = r"C:\Users\brand\Documents\projects\acres-ai\10802 Palma Vista Ave, Garden Grove, CA 92840 _ For Sale ($2,395,000) _ MLS# OC25156174 _ Redfin.mhtml"
    
    scrape_redfin_property(url, output_file)