# Who's Playing

A Dota 2 match showcase designed to scrape and show all of the matches played by set accounts

## How does it work?

Matches are pulled from the Steam Web API then combined with the OpenDota API for added detail. This scraper is written in NodeJS and can either be manually triggered on a localbuild using the **/scrape** endpoint, however once a minute the scraper is automatically ran by a AWS LightSail container cron. Once the matches have been scraped they are then written to a Supabase Postgres DB. These can then be read by the app which is hosted and autodeployed onto Vercel. 

## Stack

App - NextJS + ChakraUI 

Database - Supabase Postgres

Scraper - NodeJS + AWS LightSail

Hosting - Vercel

### To Do

- Top Matches
- Player Impact Rating
- Redo Match Rows
- About Page

