
# Safeword 🗝️
Generate many secure passwords for all your accounts in all of your websites by remembering only one word - your safeword.

At the moment, the application is still in its prototype phase. It is usable but more work needs to be put into it first, specifically the user interface.

## Images of the App
Home Page - This is where end users see all their websites and accounts
<img src="https://raw.githubusercontent.com/thisLexic/react-native-safeword/main/app_images/home.PNG" width="250">

Add Page - This is where end users can add another website and account
<br/>
<img src="https://raw.githubusercontent.com/thisLexic/react-native-safeword/main/app_images/add.PNG" width="250">

Read Page - This is where end users can view their website and account entry. They can also enter their safeword here then copy their password afterwards.
<br/>
<img src="https://raw.githubusercontent.com/thisLexic/react-native-safeword/main/app_images/read.PNG" width="250">

Copy Pop Up - This is the pop up that shows up once a valid safeword is provided
<br/>
<img src="https://raw.githubusercontent.com/thisLexic/react-native-safeword/main/app_images/copy.PNG" width="250">

Edit Page - This is where the end user can change his/her password by incrementing the version for the account.
<br/>
<img src="https://raw.githubusercontent.com/thisLexic/react-native-safeword/main/app_images/edit.PNG" width="250">

## How it works
The application takes in the following values from the end user:
- Website - Website you are logging in
- Account - Username/Email for the website
- Safeword - This is the string that will act as your "password for everything." This is the same for any account
- Version - This will act as your way of changing your password

Afterwards, the algorithm will hash these values using SHA-512. This first hash will be converted into a full alphanumeric representation which will be fed into the SHA-512 function again. This second hash will be converted into a full alphanumeric representation once again. The output will be trimmed to 15 characters. This will be the unique password for the account in that website. 


## Is it Secure?
The safeword and the password for all accounts are not stored in persistent storage. They are only stored in short-term memory. This way, once the application terminates, the user's passwords cannot be leaked unlike in other cases where passwords are stored in local storage or in a remote server.

If the account password does get compromised, the password can easily be changed just for that account by incrementing the version for that one account. As this algorithm uses SHA-512, there is an avalanche effect. One change - the version - should generate another completely different password.

Using SHA512, even if the password were compromised, the safeword should remain safe as this hash function cannot be reverse engineered (at the moment). However, if it were possible, the user input is still hashed twice which will add additional security against susceptibility to reverse engineering the safeword. For example, the use of rainbow tables is made less effective.

## Strengths
- You only need to remember one thing - safeword - to generate all your passwords
- Your passwords are not stored locally or remotely
- A password breach is only isolated to one account

## Limitations with Solutions
| Limitation                                                                                                                                                                                                                                   | Solution                                                                                                                                              |
|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|-------------------------------------------------------------------------------------------------------------------------------------------------------|
| The safeword may be compromised since it is typed for each account password. This would necessitate the regeneration of all passwords for all accounts. | The compromise of the safeword is made less likely in the current application by using a password input field, though this will not stop key loggers. |
| Certain websites have password restrictions (e.g. special characters are required)                                                                                                                                                           | The next update can include the ability to decide which kinds of characters to include in the password.                                               |
| The generated passwords for all accounts are only 15 characters long                                                                                                                                                                         | The next update can include the ability to set the password length.                                                                                   |
| If the end user needs the password to be entered on a separate device, it would be inconvenient and insecure.                                                                                                                                | There could be mobile and desktop versions of the application that sync the websites, accounts, and versions of the end user.                         |
