# Gmailnator - TypeScript
This allows you to interact with gmailnator without having to use the rapidapi verison - meaning you are not limited by the amount of requests.

## Starting
To start, make sure you create a new GmailnatorClient and call the `init` method async. This will automatically get you a CSRF token and set the HttpClient for internal use.