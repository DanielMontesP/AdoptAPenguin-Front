<div align="center">
     <h1><a href="https://adoptapenguin.netlify.app">AdoptAPenguin.com</a></h1>
    <br/>
    <img src="https://github.com/devicons/devicon/blob/master/icons/react/react-original-wordmark.svg" title="React" alt="React" width="40" height="40"/>
    <img src="https://github.com/devicons/devicon/blob/master/icons/redux/redux-original.svg" title="Redux" alt="Redux " width="40" height="40"/>
    <img src="https://github.com/devicons/devicon/blob/master/icons/typescript/typescript-plain.svg" title="typescript" alt="typescript" width="40" height="40"/>
    <img src="https://github.com/devicons/devicon/blob/master/icons/javascript/javascript-original.svg" title="JavaScript" alt="JavaScript" width="40" height="40"/>
    <img src="https://github.com/devicons/devicon/blob/master/icons/nodejs/nodejs-plain-wordmark.svg" title="NodeJS" alt="NodeJS" width="40" height="40"/>
    <img src="https://github.com/devicons/devicon/blob/master/icons/css3/css3-plain-wordmark.svg"  title="CSS3" alt="CSS" width="40" height="40"/>
    <img src="https://github.com/devicons/devicon/blob/master/icons/html5/html5-original.svg" title="HTML5" alt="HTML" width="40" height="40"/>
    <img src="https://github.com/devicons/devicon/blob/master/icons/firebase/firebase-plain-wordmark.svg" title="Firebase" alt="Firebase" width="40" height="40"/>
    <img src="https://github.com/devicons/devicon/blob/master/icons/git/git-plain.svg" title="Git" **alt="Git" width="40" height="40"/>
    <img src="https://avatars2.githubusercontent.com/u/39168408?s=460&v=4" title="sonarcloud" alt="sonarcloud" width="40" height="40"/> 
    <img src="https://github.com/devicons/devicon/blob/master/icons/jest/jest-plain.svg" title="jest" alt="jest" width="40" height="40"/>
</div>
 <br/><br/><br/>
<div className="message-container">
    AdoptAPenguin.com was my final project at ISDI Coders fullstack
    developer bootcamp (2022).
    <br />
    <br />
    Thanks Mario and all the crazy isdi coders stuff family and thanks one
    by one all penguins developers who share this bootcamp with me.
    <br />
    <br />
    This site is based on this project, tested,renewed and with new features...
    <br />
    <br />
    Designed for mobile and desktop rendering.
    <br />
    <br />
    <div align="center">
      <div>
        <img src="https://avatars2.githubusercontent.com/u/39168408?s=460&v=4" title="sonarcloud" alt="sonarcloud" width="30" height="30"/>        
        SONARCLOUD:
        <a href="https://sonarcloud.io/summary/overall?id=DanielMontesP_AdoptAPenguin-Front">FRONT</a>
        |
        <a href="https://sonarcloud.io/summary/overall?id=DanielMontesP_AdoptAPenguin-Back">BACK</a>
       </div
       <div>
          <img src="https://github.com/devicons/devicon/blob/master/icons/git/git-plain.svg" title="github" alt="gitHub" width="30" height="30"/>
          REPOS:
        <a href="https://github.com/DanielMontesP/AdoptAPenguin-Front">FRONT</a>
        |
        <a href="https://github.com/DanielMontesP/AdoptAPenguin-Back">BACK</a>
       </div>       
    </div>
    </div>
      <br/>
      <ul>
        <li>What this app does..
          <ul>
            <li>Login/Register user</li>
            <li>User profiles: Admin or User</li>
            <li>Add to user favorites list</li>
            <li>Add to user likes list</li>
            <li>Count global likes individually</li>
            <li>Create new penguin</li>
            <li>Edit penguin data</li>
            <li>Delete penguin</li>
            <li>Send new message</li>
            <li>View messages</li>
            <li>Notify unread messages</li>
            <li>User inbox</li>
            <li>Delete message</li>
            <li>Count unread messages</li>
            <li>Export data lists</li>
          </ul>
        </li>
      </ul>
     <br/>
      <ul>
        <li>Features     
          <ul>
            <li>Responsive site</li>
            <li>Search engine</li>
            <li>Backup image to firebase storage</li>
            <li>Resize uploaded images</li>
            <li>Preview uploaded image</li>
            <li>Scroll to top button</li>
          </ul>
        </li>
      </ul>
     <br/>
     Redux states
      <ul>
        <li>UI
          <ul>
            <li>Loading: True if request is still loading</li>
            <li>ModalMessage: Text message if modal prompt is called</li>
            <li>ModalType: Type for modal prompt</li>
            <li>HeaderTitle: Actual Header title</li>
            <li>HeaderLastTItle: Save last title used for back navigation operations</li>
            <li>isDesktop: True if width > 420px </li>
            <li>stringToSearch: used for search method</li>
            <li>isModalOpen: Modal status</li>
            <li>isMenuOpen: Menu status</li>
          </ul>
        </li>
      </ul>
      <ul>
        <li>User 
          <ul>
            <li>id: User id</li>
            <li>name: User name</li>
            <li>username: User username</li>
            <li>isAdmin: True if user has Admin role</li>
            <li>logged: User login status</li>
            <li>image: User image path</li>
            <li>allMessages: User messages list</li>
          </ul>
        </li >
      </ul>
    <ul>
      <li>Penguins 
        <ul>
          <li>allPenguins: List of selected penguins</li>
          <li>penguin: Selected penguin info</li>    
        </ul>
      </li>
    </ul>
    <ul>
      <li>Messages 
        <ul>
          <li>allMessages: User messages filtered by selected penguin</li>
          <li>message: Selected message info</li>    
        </ul>
      </li>
    </ul>
    <ul>
      <li>System 
        <ul>
            <li>connected: True if server available</li>
            <li>path: Server if available, local if server is not reachable</li>
            <li>status: info about connection</li>
        </ul>      
      </li>
    </ul>
</div>
