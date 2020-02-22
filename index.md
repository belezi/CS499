
## Professional Self-Assesmnet 

### Introduction & Selected Artifact

  Hi there, my name is Bilal Elezi, I am originally from Albania but now live in Boston, MA and work as a software engineer at one of the local healthcare-tech startup as well as pursuing my Bachelors Degree here at Southern New Hampshire University. In my free time I like to take walks by the ocean, play video games and spend time with my wife and friends.

The artifact that I choose for my ePortfolio is an interactive weather dashboard. This open-source project will output the hourly and daily weather forecast for any given location. For retrieving weather data I will leverage [DarkSky](https://darksky.net)'s API which can support several languages and the different units used throughout the world.

As far as software design/engineering I have decided to enhance my artifact by supporting both the Imperial and Metric systems, allowing for the dashboard to identify the location automatically on page load and display the weather data for that location. For the algorithms and data structures, I will write general functions that will compute the current data shown for the weather to the desired measurement system based on the end user’s selection. For the database enhancements, I will add all the labels for the units and languages on a relational MySQL database in order to have the user settings to be dynamic and database driven which will make it seamless on adding support for more languages in the future.

### My Education 

  I started pursuing my bachelor's degree at SNHU about 18 months ago. I have been working full time for almost four years as a software developer after having to finish my associate's degree from Quincy College. While working at my current position and pursuing the Computer Science degree here at SNHU I have soaked a ton of information and knowledge related to the field which has led me into learning things I had no idea they existed before.

Becoming a part of today's workforce takes a lot of energy and time however with the family and friends supporting me and SNHU providing an amazing program online gave me the opportunity to remotely go through the program and complete my degree. Looking back and reflecting on the days when I was thinking about joining the program I am glad that I did and not waited much longer. Throughout this journey at SNHU has been a lot of ups and downs, times when I have doubted myself whether I can do all the work with the little to no time left on the week sometimes since my work would eat up a lot of my day however I have made it thus far thanks to the support system in my life. 

### Program Reflection

  From the program here at SNHU, I have learned a lot of different topics and skills that are essential for the industry such as data structures and algorithms, databases, design, QA and Automation. 

Data structures and algorithms course was my favorite because I learned a lot as to how the data and algorithms would make it possible for a program to run and function. I gained a deeper knowledge of algorithms and how to design them to be efficient and support the problem at hand. 

The data structure is also very important because the way how you handle different data points and how they are stored in memory enables one to write algorithms that are precise and concise, eliminating all unnecessary lines of code.

Another very interesting course that I took on this program was CS310 where I learned a lot about testing and quality assurance. Being able to write high-quality code is important on this line of work however being able to also view your work from a tester's point of view has helped me on shipping better code with fewer bugs. 

The database course gave me a better understanding of how relational databases work and how to design the tables where the information will be stored and how they all are linked with each other. 

All these tools also including this capstone class have ultimately given me the knowledge and the necessary skill set to succeed in the workforce market, the ability to build any project no matter how complex and also the ability to learn new skills and tools in the future.

## Code Review Process

### Code Review Walkthough Video

[Code Review YouTube Link](https://youtu.be/6_0Om5FcPik)

### The process of code review
Code review is the process where we as developers go through our work and search for bugs, code correctness meaning if naming convention and coding standards are followed through the entire project. This process is a very important part of my job as a developer and I personally see it as a way of improving myself. Code reviews can be personal or in a group setting, which I prefer the most because your peers might have more insight on a certain language or framework, or they could learn a better way of approaching the problem. Most of the time as we near the completion of the feature or incremental being developed we schedule code reviews with our team and the lead developer introduces the problem, solution and code architecture such as functions reused or created.

The top three practices that I always stress during code review are documentation, structure, and efficiency. I am a strong advocate that any project or feature developed should be given to any developer and they should be able to understand it within an hour or two and hit the ground running. This is very important for both small and large teams and it ensures that if anything goes wrong there would be several developers able to debug the issue in record time. As far as structure I believe that breaking things down to the tiniest pieces and set them up to live independently of each other is good architecture as they can be reused and avoids repeated code in the project. Efficiency I think is something that every developer develops as they gain experience. There are always loops and iterations that all of us deal with on a daily basis however we don’t always think of the most cost-efficient ones and many times we end up with infinite loops that we are not proud of.

## Enhancements

### Software Design and Engineering

  I have chosen the showcase my design and engineering skills with my weather dashboard artifact because I see a lot of opportunities where this project can be improved and enhanced. Initially, I would enhance the artifact by setting adding the ability to load the weather dashboard for the current location where the end-user is instead of having the hardcoded value alone for a certain city. With that being said will also leave the default fallback values for the city of Montreal in place in case the end-users device geolocation is not available. 

This process of Software Design and Engineering provided me with a clearer picture of what a software designer does and taught me how to view a project from an end-user perspective in order to come up with solutions that will benefit them.

### Algorithm and Data Structures
  
  The reason why I have included this artifact is that it empowers me to showcase my knowledge of algorithms and data structures. In order to achieve the end product, I will have to work with a lot of static and dynamic data points. I improved the artifact by adding the ability to set your own preferences on the units, time format, and language in which the dashboard and weather hourly and daily forecasts are displayed to the end-user. I believe that I have met the course objectives planned with this artifact and I gained a deeper understanding of algorithms and data structures along the process of enhancing my artifact.

### Databases

  The reason why I chose this artifact is that I envisioned enhancing it and allowing for the data to be structured and to add a database component to it. Initially, I was planning on giving the user the ability to add several cities however since this is a static dashboard and is meant to display the weather forecast without a lot of end-user interaction, I decided to add a few controls settings. What that means is that now the end-user will have the ability to choose the format and language in which the data will be displayed. I believe that I did meet the objectives of the course as I showcased the ability to design a relational database MySQL and host it on an EC2 instance in AWS. While enhancing this artifact I learned a lot about AWS cloud platform and EC2 instances as well as back end languages such as PHP needed to make the connection between the JavaScript and database. The challenge that I was faced with was accessing the database and also hosting it since I had not done it before. I relied heavily on AWS documentation and learning tutorials. 

## Finished Artifact

### Link to my artifact

To view my artifact please follow this link [Weather Dashboard Artifact](https:/belezi.github.io/project/index.html)

### About the artifact
The artifact that I have chosen is a Weather Dashboard which provides the weather forecast for the end-user based on their location. This project was an open-source project that I saw the opportunity and decided to enhance and add more features to. The project is created initially a couple of years back and has been modified and enhanced during the course of January through February 2020.

I included this artifact on my portfolio because it gave me the opportunity to enhance it and create a full end to end experience for the end-user and also showcase all the required skills in the process, for example, the auto-detection of the users location, the ability to pull the data dynamically from a relational database and the ability to work with open-source API's such as the Google Geolocation API and DarkSky API in order to pull the location's latitude, longitude, city or town name, and the weather forecast data respectively.

While enhancing the artifact I learned a lot about the topics covered from the process such as software design, data structures, algorithms, and databases by doing a lot of hands-on. I learned how to consume Google's Geolocation API and also how to host an EC2 instance in AWS and leverage it for the MySQL database set up.





