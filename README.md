
# COSMIC PURSUIT - Contest Platform
Cosmic Pursuit is an on-campus treasure hunt organized by [RIT S.T.A.R.D.U.ST]( https://teamstardust.herokuapp.com/) on 10th Jun, 2022. The event witnessed around 150 participants in the form of 50+ teams.

This repository contains the source code to the website and server used as the contest portal and leaderboard in order to make the hunt more interactive and engaging.

## Contest Structure
1) A map will be provided to the teams, each college building is named as a planet or a space object.
2) Each level in the treasure hunt consists of **2 parts**.
3) The **first part of the level is a puzzle** will be handed over to you on a piece of paper. (Please note the puzzle on the paper has nothing to do with the next location)
4) **Important :** For every round immediately scan the QR code on the paper before you solve the puzzle. Once you scan the QR code, your points will be reflected on the leaderboard.
5) Once you solve the puzzle given on the paper, go ahead and enter the code on the website.
6) If you have entered the correct code, a **4 liner** would be displayed on the website.
7) The second part - **4 liner is a hint to your next location**. (It hints at the next location either using the planet or the description of the place itself or both)
8) Once you have cracked the clue, go to the location you just figured, the volunteers there will hand you out the puzzle for the next level, now scan the QR code given and solve the puzzle.
9) The cycle repeats. 
> Paper -> Scan for points -> Solve -> Enter code on website -> Website gives 4 liner -> Crack it -> Go to the next location & repeat

## Screenshots

<img src="https://user-images.githubusercontent.com/37346450/173631043-82058ef1-5ae1-4928-a29f-f9830b27a7fd.jpg" height="400" float="left"/><img src="https://user-images.githubusercontent.com/37346450/173631101-75db8cc8-f01d-4c8c-b319-8ecbdcb04862.jpg" height="400" float="left"/><img src="https://user-images.githubusercontent.com/37346450/173631155-05920730-614d-4f5a-bbff-9bb2d4748648.jpg" height="400" float="left"/><img src="https://user-images.githubusercontent.com/37346450/173631246-ef061fc3-4f6f-44ef-a638-b0ecec6fccd4.jpg" height="400" float="left"/><img src="https://user-images.githubusercontent.com/37346450/173637029-7f345b1a-dfbf-4235-bb45-834db17fa10c.jpg" height="400" float="left"/>


## Installation

### Frontend: 

1. Add your `.env` file to the root directory
    >You can refer `sample.env` for the same
    
2. Install the required dependencies using
	  ```bash
    $ npm i --force
    ```
	> The `--force` flag is used as one of the dependency would fail to install without it.
	
4. In the project root directory, you can run:

    ```bash
    $ npm start
    ```

    >Runs the website in the development mode. Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

### Backend: 
1. Launch another terminal and switch to the server directory, by running:

     ```bash
     $ cd server
     ```
     
2. Add your `.env` file to the server directory
    >You can refer `server/sample.env` for the same

3. Install the required dependencies using
	  ```bash
    $ npm i
    ```

4. In the server directory, you can run:

     ```bash
     $ npm start
     ```
     or
     ```bash
     $ nodemon .
     ```
    >Runs the server in the development mode at [http://localhost:5000](http://localhost:5000).

## Idea & Concept

- Reesha Shenoy
	- Design Head @ Non-Tech Team - RIT STARDUST
	- GitHub: [@reeshaa](https://github.com/reeshaa/)
	- LinkedIn: [@reesha-shenoy](https://www.linkedin.com/in/reesha-shenoy/)

## Design & Development

1. Suraj Kumar P 
	- GitHub: [@psk907](https://github.com/psk907/)
	- LinkedIn: [@suraj-kumar-p](https://linkedin.com/in/suraj-kumar-p/)
2. Aakash 
	- GitHub: [@aakashpothepalli](https://github.com/aakashpothepalli)
	- LinkedIn: [@aakashpothepalli](https://www.linkedin.com/in/aakashpothepalli/)
3. Dhruv Dange
	- GitHub: [@DhruvDange](https://github.com/DhruvDange)
	- LinkedIn: [@dhruv-dange](https://www.linkedin.com/in/dhruv-dange/)
