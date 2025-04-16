# Robinson Crusoe: Adventure on the Cursed Island - Fan Project


A fan-made digital adaptation of the board game *Robinson Crusoe: Adventure on the Cursed Island* by **Ignacy Trzewiczek**.

**Live Demo:** [https://board-game-ten.vercel.app](https://board-game-ten.vercel.app)

## About the Project
This is an unofficial, non-commercial passion project — a digital adaptation of *Robinson Crusoe: Adventures on the Cursed Island*, the iconic cooperative board game designed by Ignacy Trzewiczek.

The goal of the project is to bring the immersive survival experience of the original game into a web-based environment, allowing players to face the same tough choices, cooperative challenges, and unpredictable events — all online.

This project was created as part of my engineering thesis, combining my love for modern board games with web development technologies. It is intended for educational and demonstrational purposes only. All rights to the original game and its content belong to Portal Games and the original creators.

<details>
  <summary><h2>About the original game</h2></summary>

  > Robinson Crusoe: Adventures on the Cursed Island is a game created by Ignacy Trzewiczek, the author of Stronghold. This time Trzewiczek takes the players to a deserted island, where they'll play the parts of shipwreck survivors confronted by an extraordinary adventure. They'll be faced with the challenges of building a shelter, finding food, fighting wild beasts, and protecting themselves from weather changes. Building walls around their homes, animal domestication, constructing weapons and tools from what they find, and much more await them on the island. The players decide in which direction the game will unfold and – after several in-game weeks of hard work – how their settlement will look. Will they manage to discover the secret of the island in the meantime? Will they find a pirate treasure, or an abandoned village? Will they discover an underground city or a cursed temple at the bottom of a volcano? Answers to these questions lie in hundreds of event cards and hundreds of object and structure cards that can be used during the game...
> 
> Robinson Crusoe: Adventures on the Cursed Island is an epic game from Portal. You will build a shelter, palisade, weapons, you will create tools like axes, knives, sacks, you will do everything you can to… to survive. You will have to find food, fight wild beasts, protect yourself from weather changes…
> 
> Take the role of one of four characters from the ship crew (cook, carpenter, explorer, or soldier) and face the adventure. Use your determination skills to help your teammates, discuss with them your plan, and put it into practice. Debate, discuss, and work on the best plan you all can make.
> 
> Search for treasures. Discover mysteries. Follow goals of six different, engaging scenarios. Start by building a big pile of wood and setting it on fire to call for help, and then start new adventures. Become an exorcist on cursed Island. Become a treasure hunter on Volcano Island. Become a rescue team for a young lady who’s stuck on rock island…
> 
> Let the adventure live!
> - Source [BoardGameGeek](https://boardgamegeek.com/boardgame/121921/robinson-crusoe-adventures-on-the-cursed-island)

</details>

## Key Features
- 🔄 Faithful recreation of original game mechanics
- 🎮 Interactive interface with automated rules
- 📜 Basic game guide
- 🧑‍🤝‍🧑 Four playable characters implemented
- 🎲 One scenario fully implemented
- 🃏 Majority of cards and tokens included
- 🖱️ Guided UI walkthrough of all game controls (toggleable)
- 💾 Game save and load functionality, allowing players to save progress and resume later
- 👥 Real-time multiplayer via Socket.IO
- ✉️ User accounts with email verification
- 🌐 i18n internationalization support (currently Polish-only, with translation infrastructure almost ready for future languages)


<details>
  <summary><h2>Screenshots</h2></summary>

  ![obraz](https://github.com/user-attachments/assets/c877f3c8-78c5-43e7-82e9-44d550627288)
  ![obraz](https://github.com/user-attachments/assets/e46aed06-59a0-4ae7-b01d-1cf746a4d9af)
  ![obraz](https://github.com/user-attachments/assets/8ecc0b9f-9d61-438f-ac2a-d0a17d836816)
  ![obraz](https://github.com/user-attachments/assets/3b55d7c6-50c5-4f30-bc90-c88eda31945f)
  ![obraz](https://github.com/user-attachments/assets/b082aad8-6555-4c5e-a361-3adf89485bf6)
  ![obraz](https://github.com/user-attachments/assets/280d1d7d-3ff0-4cff-93a5-7439181b4f08)
  ![obraz](https://github.com/user-attachments/assets/0dd26a44-1b81-4757-be4f-2cc9b4fab788)




</details>

## Technology Stack

### Frontend
| Technology | Purpose |
|------------|---------|
| TypeScript | Type safety |
| React + Next.js | UI framework |
| Redux Toolkit | State management |
| Three.js | 3D elements |
| i18next | Localization |

### Backend
| Technology | Purpose |
|------------|---------|
| TypeScript | Type safety |
| Node.js | Runtime |
| Express | Server framework |
| Socket.IO | Real-time communication |
| MongoDB | Database |
| Nodemailer | Email verification |

## Getting Started 

### Prerequisites
- Node.js (v18+)
- MongoDB Atlas account or local instance
- SMTP credentials for email (Tested with gmail)

### Installation
### 1. Clone the repository.
### 2. Configure `.env` files
- In the "client" and "server" folders, create `.env` files based on the `.env.example` files located there.  
- Fill in the required environment variables.  

To run the project locally, only the following environment variables need to be configured:
- **MONGODB_URI**: Connection string for the MongoDB database.  
- **EMAIL_SERVICE**: Name of the email service (e.g., gmail).  
- **EMAIL_USER**: Email address used for sending messages.  
- **EMAIL_PASSWORD**: Email app password.  
- **EMAIL_FROM**: Sender’s email address.

To enable the bot to send emails, you need to configure an email account (e.g., Gmail) and generate an app password, which will be used in the `EMAIL_PASSWORD` environment variable. For Gmail, the app password can be generated in your account settings, under Security > App Passwords.

### 3. Install dependencies
- In the `client` and `server` folders, run the command:
  ```bash
  npm install
- If installing dependency fails use `--force` flag:
  ```bash
  npm install --force
### 4. Build source files
- In the 'client' and 'server' folders, run the command
  ```bash
  npm run build
### 5. Run the project
- In the 'client' and 'server' folders, run the command
  ```bash
  npm run start
- Open your browser and in the address bar enter: `http://localhost:3000`
- If using a different configuration, replace `3000` with the configured port.

