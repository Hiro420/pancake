# pancake-paimooon
A Working Genshin Impact private server hosted in your own pc.

# Installation
The installation assumes you have installed the next things in your pc

* [Fiddler](https://www.telerik.com/download/fiddler)

## Project
1. clone the project
1. Run `modules.bat` to install the required modules
1. You can now open the project in your IDE

## Fiddler 
1. Open fiddler and go to FiddlerScripts
![image](https://user-images.githubusercontent.com/52223947/113501027-ba59d780-94df-11eb-9b44-343a435eea67.png)
1. Copy `fiddler.cs` content and paste it into fiddler
1. Press **Save Script** button
![image](https://user-images.githubusercontent.com/52223947/113501041-d2c9f200-94df-11eb-91fd-ccfe53589c3f.png)

Now open Genshin Impact and have fun.

# How To Play
1. Open Fiddler
1. Double click `start.bat`

**WARNING**
> **Do not close Fiddler or the console if you want to play in the server**


# TODO
* Character Skill (AvatarExcelData Related)
* Console (PrivateChatReq, GetPlayerFriendListReq)
* Change Avater (ChangeAvatarReq)
* Warp Point Teleport (Currently MarkMap Pin works as teleport)
* Chasm light up, enable right tab

# Modules Used
Modules used for this project, will be adding more.
* net - TCP Server
* http - HTTP Server
* dgram - UDP Server
* node-kcp - KCP Server
* protobuff-js - Protobuff encoding
* sqlite3 - Database reading
* udp-proxy - works as a sniffer
