function showOverlay(option, element) {
    document.getElementById("imageOverlay").classList.remove("overlayOff");
    switch(option) {
        case "background": // currently covered by a dark translucent full page background div so not clickable
            document.getElementById("overlayImg").src = "";
            document.getElementById("overlayImg").alt = "Adidas Gazelles";
            document.getElementById("overlayText").innerHTML = "Adidas Gazelles";
            break;
        case "districtsix":
            document.getElementById("overlayImage").removeChild(document.getElementById("overlayImg"));
            document.getElementById("overlayImage").innerHTML = '<iframe src="https://districtsixmuseum.github.io/memorymappingproject"></iframe>';
            document.getElementById("overlayText").innerHTML = 'Map can be panned (mouse click and drag) and zoomed (mouse double-click or mouse scrollwheel or buttons in upper left corner). Some points do not appear until sufficiently zoomed in. Click on a storyteller&apos;s button above to highlight that individual&apos;s story. Click on a landmark button below to toggle its icons on and off. Click on a location in the map to see more details about it. Click on an image to expand it.';
            break;
        case "artifact":
            document.getElementById("overlayImg").src = element.children[0].src;
            document.getElementById("overlayImg").alt = element.children[0].alt;
            document.getElementById("overlayText").innerHTML = element.children[0].alt;
            break;
        default:
            document.getElementById("overlayImg").src = element.src;
            document.getElementById("overlayImg").alt = element.alt;
            document.getElementById("overlayText").innerHTML = element.alt;
            break;
    }
    if (element.src.includes("digitalprototypemobile")) {
        document.getElementById("overlayImage").removeChild(document.getElementById("overlayImg"));
        document.getElementById("overlayImage").innerHTML = "<iframe style='height: 70vh;' src='https://www.figma.com/embed?embed_host=share&url=https%3A%2F%2Fwww.figma.com%2Fproto%2FYC8xfxRYXYLaYJarzpc6jv7F%2FDistrict-Six-Museum-Wireframe%3Fnode-id%3D17%253A46%26scaling%3Dscale-down' allowfullscreen></iframe>";
    }
}

function closeOverlay() {
    document.getElementById("imageOverlay").classList.add("overlayOff");
    document.getElementById("overlayImage").innerHTML = '<img id="overlayImg" src="">';
    document.getElementById("overlayText").innerHTML = '';
}

function loadPage() {
    var locationPage = document.URL.split("/")[document.URL.split("/").length -1].split(".")[0];

    var imageDirectory = "images/";
    var linkDirectory = "work/";
    var full;

    switch (locationPage) {
        case "index" : // need to decide whether this page will actually end in index.html
            full = true;    
            loadGallery(imageDirectory, linkDirectory, locationPage, full);
            break;
        case "" : // this handles ending not in .html such as /portfolio
            full = true;
            loadGallery(imageDirectory, linkDirectory, locationPage, full);
            break;
        // case "work" :
        //     full = true;
        //     break;
        case "connect" :
            break;
        default:
            imageDirectory = "../images/";
            linkDirectory = "";
            loadContent(imageDirectory, locationPage);
            loadGallery(imageDirectory, linkDirectory, locationPage, full);
            break;
    }
}

function loadContent(imageDirectory, locationPage) {
    var fullImageDirectory = imageDirectory + locationPage + "/";

    var titleDiv = document.getElementById("descriptionTitle");
    var tagsDiv = document.getElementById("descriptionTags");
    var subtitleDiv = document.getElementById("descriptionSubtitle");
    var artifactImg = document.getElementById("artifactImage");
    titleDiv.innerHTML = workLibrary[locationPage]["title"];
    tagsDiv.innerHTML = workLibrary[locationPage]["tags"];
    subtitleDiv.innerHTML = workLibrary[locationPage]["subtitle"];
    artifactImg.src = fullImageDirectory + workLibrary[locationPage]["artifact"];
    artifactImg.alt = workLibrary[locationPage]["artifactAlt"];
    processTab(0);
}

function hoverInteractive() {
    var interactiveCoverDiv = document.getElementById("interactiveCover");
    interactiveCoverDiv.style.visibility = "visible";
    interactiveCoverDiv.style.color = "rgba(100,100,100,1)";
    interactiveCoverDiv.classList.add("interactiveCoverHover");
}

function departInteractive() {
    var interactiveCoverDiv = document.getElementById("interactiveCover");
    interactiveCoverDiv.style.visibility = "hidden";
    interactiveCoverDiv.style.color = "rgba(100,100,100,0)";
    interactiveCoverDiv.classList.remove("interactiveCoverHover");
}

function processTab(nextTab) {
    // var processDiv = document.getElementById("process");
    // var processNav = processDiv.children[0];
    var processNav = document.getElementById("process").children[0];
    for (var i = 0; i < processNav.children.length; i++) {
        if (processNav.children[i].classList.contains("activeTab")) {
            processNav.children[i].classList.remove("activeTab");
            // processDiv.children[i + 1].classList.remove("activeExpand");
            break;
        }
    }
    processNav.children[nextTab].classList.add("activeTab");
    // processDiv.children[nextTab + 1].classList.add("activeExpand");

    var currentPage = document.URL.split("/")[document.URL.split("/").length -1].split(".")[0];
    var fullImageDirectory = "../images/" + currentPage + "/";
    switch (nextTab) {
        case 0:
            var processLibrary = workLibrary[currentPage]["examine"];
            break;
        case 1:
            var processLibrary = workLibrary[currentPage]["experiment"];
            break;
        case 2:
            var processLibrary = workLibrary[currentPage]["embed"];
            break;
    }
    var processExpand = document.getElementById("processExpand");
    processExpand.innerHTML = "";
    for (var i = 0; i < Object.keys(processLibrary).length; i++) {
        var processTextDiv = document.createElement("div");
        processTextDiv.innerHTML = processLibrary[i]["txt"];
        processTextDiv.classList.add("processText");
        var processRow = document.createElement("div");
        processRow.classList.add("processRow");
        processRow.appendChild(processTextDiv);
        if (processLibrary[i]["img"]) {
            var processArtifactDiv = document.createElement("div");
            processArtifactDiv.classList.add("processArtifact");
            if (Object.keys(processLibrary[i]["img"]).length > 1) {
                var imageLeft = document.createElement("div");
                imageLeft.innerHTML = "❮";
                imageLeft.id = "imageLeft";
                imageLeft.classList.add("imageArrow");
                imageLeft.addEventListener("click", function(e) {
                    e.stopPropagation();
                    imageChange(-1, this.parentElement.getElementsByTagName("img"));
                });
                var imageRight = document.createElement("div");
                imageRight.innerHTML = "❯";
                imageRight.id = "imageRight";
                imageRight.classList.add("imageArrow");
                imageRight.addEventListener("click", function(e) {
                    e.stopPropagation();
                    imageChange(1, this.parentElement.getElementsByTagName("img"));
                });
                processArtifactDiv.appendChild(imageLeft);
                processArtifactDiv.appendChild(imageRight);
            }
            for (var j = 0; j < Object.keys(processLibrary[i]["img"]).length; j++) {
                var processImg = document.createElement("img");
                processImg.src = fullImageDirectory + processLibrary[i]["img"][j];
                processImg.alt = processLibrary[i]["alt"][j];
                processImg.classList.add("processImg");
                processImg.addEventListener("click", function(e) {
                    showOverlay('', this);
                });
                if (j > 0) {
                    processImg.style.display = "none";
                }
                processArtifactDiv.appendChild(processImg);
            }
            processRow.appendChild(processArtifactDiv);
        }
        processExpand.appendChild(processRow);
    }
}

function imageChange(direction, imageList) {
    var currentImg;
    for (var i = 0; i < imageList.length; i++) {
        if (imageList[i].style.display != "none") {
            currentImg = i;
            imageList[i].style.display = "none";
            break;
        }
    }
    switch (currentImg + direction) {
        case -1:
            imageList[imageList.length - 1].style.display = "initial";
            break;
        case imageList.length:
            imageList[0].style.display = "initial";
            break;
        default:
            imageList[currentImg + direction].style.display = "initial";
            break;
    }
}

function loadGallery(imageDirectory, linkDirectory, locationPage, full) {
    
    if (!full) {
        var galleryDiv = document.getElementById("gallery");
        var workNum;
        var galleryLength = Object.keys(workLibrary["gallery"]).length;

        var galleryItemLink = document.createElement("a");
        galleryItemLink.href = "../index.html";
        var galleryItemDiv = document.createElement("div");
        var i = 0;
        galleryItemDiv.id = "work" + i;
        galleryItemDiv.classList.add("imageCenter");
        galleryItemDiv.addEventListener("mouseover", function () {
            hoverWork(i);
        });
        galleryItemDiv.addEventListener("mouseout", function () {
            departWork(i);
        });
        var galleryItemImageGroup = document.createElement("div");
        galleryItemImageGroup.classList.add("imageGroup");
        var galleryItemImageCover = document.createElement("div");
        galleryItemImageCover.classList.add("imageCover");
        var galleryItemImage = document.createElement("img");
        galleryItemImage.src = "../images/logo.png";
        galleryItemImageGroup.appendChild(galleryItemImageCover);
        galleryItemImageGroup.appendChild(galleryItemImage);
        galleryItemDiv.appendChild(galleryItemImageGroup);
        galleryItemLink.appendChild(galleryItemDiv);
        galleryDiv.appendChild(galleryItemLink);

        for (let i = 1; i < galleryLength + 1; i++) {
            if (workLibrary["gallery"][i] == locationPage) {
                workNum = i;
            }
            galleryItemLink = document.createElement("a");
            // if ((i != galleryLength) && (workNum != i)) {
            if (workNum != i) {
                galleryItemLink.href = linkDirectory + workLibrary["gallery"][i] + ".html";
            }
            else {
                if (document.URL.includes("work")) {
                    galleryItemLink.href = "../work.html";
                }
                else {
                    galleryItemLink.href = "work.html";
                }
            }
            galleryItemDiv = document.createElement("div");
            galleryItemDiv.id = "work" + i;
            galleryItemDiv.classList.add("imageCenter");
            if (workNum != i) {
                galleryItemDiv.addEventListener("mouseover", function () {
                    hoverWork(i);
                });
                galleryItemDiv.addEventListener("mouseout", function () {
                    departWork(i);
                });
            }
            else {
                galleryItemDiv.classList.add("imageCurrent");
            }
            galleryItemImageGroup = document.createElement("div");
            galleryItemImageGroup.classList.add("imageGroup");
            galleryItemImageCover = document.createElement("div");
            galleryItemImageCover.classList.add("imageCover");
            galleryItemImage = document.createElement("img");
            // if (i != galleryLength) {
                galleryItemImage.src = imageDirectory + workLibrary["gallery"][i] + "/" + workLibrary[workLibrary["gallery"][i]]["thumbnail"];
            // }
            // else {
            //     if (document.URL.includes("work")) {
            //         galleryItemImage.src = "../images/etc.png";
            //     }
            //     else {
            //         galleryItemImage.src = "images/etc.png";
            //     }
            // }
            galleryItemImageGroup.appendChild(galleryItemImageCover);
            galleryItemImageGroup.appendChild(galleryItemImage);
            galleryItemDiv.appendChild(galleryItemImageGroup);
            galleryItemLink.appendChild(galleryItemDiv);
            galleryDiv.appendChild(galleryItemLink);
//             galleryDiv.children[i].children[0].children[0].children[1].src = imageDirectory + workLibrary["gallery"][i] + "/" + workLibrary[workLibrary["gallery"][i]]["thumbnail"];
//             galleryDiv.children[i].href = linkDirectory + workLibrary["gallery"][i] + ".html";
        }

//         if (document.URL.includes("work")) {
//             if (typeof(workNum) == 'number') {
//                 var currentGallery = galleryDiv.children[workNum].innerHTML;
//                 galleryDiv.children[workNum].href = "";
//                 galleryDiv.children[workNum].children[0].classList.add("imageCurrent");
//             }
//             galleryDiv.children[galleryLength].children[0].children[0].children[1].src = "../images/etc.png";
//             galleryDiv.children[galleryLength].href = "../work.html";
//         }
//         else {
//             galleryDiv.children[galleryLength].children[0].children[0].children[1].src = "images/etc.png";
//             galleryDiv.children[galleryLength].href = "work.html";
//         }
    }
    else {
        document.getElementById("descriptionTitle").innerHTML = workLibrary["portfolio"]["title"];
        document.getElementById("descriptionTags").innerHTML = workLibrary["portfolio"]["tags"];
        document.getElementById("descriptionSubtitle").innerHTML = workLibrary["portfolio"]["subtitle"];
        document.getElementById("artifactImage").src = "images/portfolio/" + workLibrary["portfolio"]["artifact"];
        var galleryDiv = document.getElementById("fullGallery");
        for (let i = 0; i < Object.keys(workLibrary["fullGallery"]).length; i++) {
            var workItem = workLibrary["fullGallery"][i];
            var workDiv = document.createElement("div");
            workDiv.classList.add("fullGalleryWorkDiv");
            workDiv.addEventListener("mouseover", function() {
                updatePreview(i);
            });
            var workImg = document.createElement("img");
            workImg.src = imageDirectory + workItem + "/" + workLibrary[workItem]["thumbnail"];
            workDiv.appendChild(workImg);
            var workA = document.createElement("a");
            if (workLibrary[workItem]["active"]) {
                workA.href = linkDirectory + workItem + ".html";
            }
            else {
                workA.classList.add("inactiveLink");
            }
            workA.appendChild(workDiv);
            galleryDiv.appendChild(workA);
        }
    }
}

function hoverWork(workItem) {
    var workID = "work" + workItem;
    var workDiv = document.getElementById(workID);
    workDiv.classList.add("imageCenterHover");
    workDiv.children[0].children[0].classList.add("imageCoverHover");
}

function departWork(workItem) {
    var workID = "work" + workItem;
    var workDiv = document.getElementById(workID);
    workDiv.classList.remove("imageCenterHover");
    workDiv.children[0].children[0].classList.remove("imageCoverHover");
}

function updatePreview(i) {
    var workItem = workLibrary["fullGallery"][i];
    document.getElementById("descriptionTitle").innerHTML = workLibrary[workItem]["title"];
    document.getElementById("descriptionTags").innerHTML = workLibrary[workItem]["tags"];
    document.getElementById("descriptionSubtitle").innerHTML = workLibrary[workItem]["subtitle"];
    document.getElementById("artifactImage").src = "images/" + workItem + "/" + workLibrary[workItem]["artifact"];
    document.getElementById("artifactImage").alt = workLibrary[workItem]["artifactAlt"];
}

var workLibrary = {
    "gallery": {
        1: "districtsix",
        2: "veggiefresh",
        3: "skim",
        4: "murphybed",
//         4: "ceder",
//         5: "youngread",
//         6: "cofund",
    },
    "fullGallery": {
        0: "portfolio",
        1: "balllauncher",
        2: "ceder",
        3: "districtsix",
        4: "murphybed",
        5: "skim",
        6: "umlibrary",
        7: "veggiefresh",
        8: "youngread",
        // arassistant
        // balllauncher
        // recycleaa
        // wisedesign
    },
    "arassistant": {
        "title": "",
        "tags": "",
        "subtitle": "",
        "artifact": "",
        "artifactAlt": "",
        "examine": {
            0: {
                "txt": "",
                "img": "",
                "alt": "",
            },
            1: {
                "txt": "",
                "img": "",
                "alt": "",
            },
            2: {
                "txt": "",
                "img": "",
                "alt": "",
            },
            3: {
                "txt": "",
                "img": "",
                "alt": "",
            },
        },
        "experiment": {
            0: {
                "txt": "",
                "img": "",
                "alt": "",
            },
            1: {
                "txt": "",
                "img": "",
                "alt": "",
            },
            2: {
                "txt": "",
                "img": "",
                "alt": "",
            },
            3: {
                "txt": "",
                "img": "",
                "alt": "",
            },
        },
        "embed": {
            0: {
                "txt": "",
                "img": "",
                "alt": "",
            },
            1: {
                "txt": "",
                "img": "",
                "alt": "",
            },
            2: {
                "txt": "",
                "img": "",
                "alt": "",
            },
            3: {
                "txt": "",
                "img": "",
                "alt": "",
            },
        },
        "thumbnail": "thumbnail.png",
        "active": "",
        "extra": "",
    },
    "balllauncher": {
        "title": "Spring-Powered Ball Launcher",
        "tags": "product design, industrial design, design engineering, manufacturing",
        "subtitle": "A mechanical engineering instructor approached our team with the request to design and build a demonstration piece that could be used in his course to illustrate spring mechanics principles. In conversation with the instructor, we arrived at the idea of a spring-powered ball launcher where the characteristics of the springs could be given to students during lecture for them to calculate how high balls would be launched then watch the balls be launched to compare with their predictions. To design and build this ball launcher, our team<ul><li><span class='keyword'>defined design constraints</span> based on size and weight limits that the instructor could carry</li><li><span class='keyword'>visited the lecture hall</span> to see from the students' perspective what kind of ball would be visible launched into the air</li><li><span class='keyword'>brainstormed ideas</span> for spring compression, retention, and release mechanisms</li><li><span class='keyword'>3D modeled the final design</span> that the team converged on</li><li><span class='keyword'>sourced components</span> from suppliers that fit within the budget</li><li><span class='keyword'>machined, manufactured, and assembled</span> the final product according to the design specifications</li><li><span class='keyword'>tested the product</span> for performance and durability</li></ul><br>Our assembled ball launcher was used for 3 years before having its design iterated by another team.",
        "artifact": "me450_assembled.png",
        "artifactAlt": "",
        "examine": {
            0: {
                "txt": "",
                "img": "",
                "alt": "",
            },
            1: {
                "txt": "",
                "img": "",
                "alt": "",
            },
            2: {
                "txt": "",
                "img": "",
                "alt": "",
            },
            3: {
                "txt": "",
                "img": "",
                "alt": "",
            },
        },
        "experiment": {
            0: {
                "txt": "",
                "img": "",
                "alt": "",
            },
            1: {
                "txt": "",
                "img": "",
                "alt": "",
            },
            2: {
                "txt": "",
                "img": "",
                "alt": "",
            },
            3: {
                "txt": "",
                "img": "",
                "alt": "",
            },
        },
        "embed": {
            0: {
                "txt": "",
                "img": "",
                "alt": "",
            },
            1: {
                "txt": "",
                "img": "",
                "alt": "",
            },
            2: {
                "txt": "",
                "img": "",
                "alt": "",
            },
            3: {
                "txt": "",
                "img": "",
                "alt": "",
            },
        },
        "thumbnail": "thumbnail.png",
        "active": "",
        "extra": "",
    },
    "ceder": {
        "title": "CEDER Website UX Evaluation and Redesign",
        "tags": "design research, market research, interaction mapping, prototyping, usability testing",
        "subtitle": "The <a href='https://soe.umich.edu/ceder' target='_blank'>Center for Education Design, Evaluation, and Research (CEDER)</a> within the University of Michigan's School of Education assists with instructional design, conducts program evaluations, and supports educational research. Since the School of Education was in the process of revamping its web presence, so CEDER approached our team to conduct a design evaluation of CEDER's existing website and provide recommendations on how it might be improved as part of the larger redesign. To address their request, we<ul><li><span class='keyword'>interviewed stakeholders</span> to learn about the goals of the website</li><li><span class='keyword'>mapped interactions</span> of the website to understand the current architecture and navigation</li><li><span class='keyword'>surveyed the population</span> who would be likely to visit their website</li><li><span class='keyword'>applied usability heuristics</span> to evaluate their existing website</li><li><span class='keyword'>analyzed comparator organizations' websites</span> to identify trends and better practices</li><li><span class='keyword'>mocked up a prototype redesign</span> of their website incorporating some of the insights gained</li><li><span class='keyword'>guided individuals through tasks</span> to evaluate the prototype redesign</li></ul><br>Our findings included that<ul><li>each webpage had many paragraphs of text that was daunting for visitors so our recommendation was to add stratification with headings, collapsible sections, and images to help guide the visitor's attention</li><li>visitors to the website are prospective clients and want to see previous work examples to assess whether CEDER's services are appropriate for their needs</li><li>while the website had an intake form to invite collaborations, prospective clients prefer to initiate conversations with a real person and therefore would like to see contact information</li><li>pricing information had been left off of the website since services were custom to each project, but prospective clients needed to be able to determine whether costs would fit their budgets</li></ul>",
        "artifact": "thumbnail.png",
        "artifactAlt": "",
        "examine": {
            0: {
                "txt": "stakeholder conversations",
                "img": "",
                "alt": "",
            },
            1: {
                "txt": "interaction map",
                "img": "",
                "alt": "",
            },
            2: {
                "txt": "usability heuristic analysis",
                "img": "",
                "alt": "",
            },
            3: {
                "txt": "survey",
                "img": "",
                "alt": "",
            },
            4: {
                "txt": "comparative analysis",
                "img": "",
                "alt": "",
            },
        },
        "experiment": {
            0: {
                "txt": "prototyping",
                "img": "",
                "alt": "",
            },
            1: {
                "txt": "",
                "img": "",
                "alt": "",
            },
        },
        "embed": {
            0: {
                "txt": "guided testing",
                "img": "",
                "alt": "",
            },
            1: {
                "txt": "Kano analysis",
                "img": "",
                "alt": "",
            },
        },
        "thumbnail": "thumbnail.png",
        "active": "",
        "extra": "",
    },
    "cofund": {
        "title": "CoFund Community Emergent Need Funding Platform",
        "tags": "market research",
        "subtitle": "cofund blah blah",
        "artifact": "thumbnail.png",
        "artifactAlt": "",
        "examine": {
            0: {
                "txt": "",
                "img": "",
                "alt": "",
            },
            1: {
                "txt": "",
                "img": "",
                "alt": "",
            },
            2: {
                "txt": "",
                "img": "",
                "alt": "",
            },
            3: {
                "txt": "",
                "img": "",
                "alt": "",
            },
        },
        "experiment": {
            0: {
                "txt": "",
                "img": "",
                "alt": "",
            },
            1: {
                "txt": "",
                "img": "",
                "alt": "",
            },
            2: {
                "txt": "",
                "img": "",
                "alt": "",
            },
            3: {
                "txt": "",
                "img": "",
                "alt": "",
            },
        },
        "embed": {
            0: {
                "txt": "",
                "img": "",
                "alt": "",
            },
            1: {
                "txt": "",
                "img": "",
                "alt": "",
            },
            2: {
                "txt": "",
                "img": "",
                "alt": "",
            },
            3: {
                "txt": "",
                "img": "",
                "alt": "",
            },
        },
        "thumbnail": "thumbnail.png",
        "active": "",
        "extra": "",
    },
    "districtsix": {
        "title": "Cape Town District Six Pre-Apartheid Community Memory Mapping",
        "tags": "interaction development, UX design, information architecture, technology implementation, GIS",
        "subtitle": "The District Six Museum in Cape Town, South Africa wanted to publish an interactive online map capturing life in the District Six community prior to the racially segregating apartheid system of the mid-to-late 1900s when its residents were forcibly removed and the buildings were demolished. Our team<ul><li><span class='keyword'>interviewed former residents</span> to hear their stories about life in District Six</li><li><span class='keyword'>gathered community landmark information</span> within the museum archives</li><li><span class='keyword'>geolocated streets and building footprints</span> from historical aerial photographs</li><li><span class='keyword'>defined design objectives</span> for the deliverable based on discussions with stakeholders</li><li><span class='keyword'>designed the user experience</span> through iterative prototypes</li><li><span class='keyword'>developed interactive features</span> to aid viewer exploration of the content</li><li><span class='keyword'>implemented this map</span> on the museum’s website: <a href='https://districtsix.co.za/project/st-marks-memory-mapping-project' target='_blank'>districtsix.co.za/project/st-marks-memory-mapping-project</a></li></ul><br>The code of this map has been archived as part of the <a href='https://archiveprogram.github.com/arctic-vault' target='_blank'>GitHub Arctic Code Vault</a>. This project received Honorable Mention at the <a href='https://ii.umich.edu/asc/stem/conferences/stem5-tech-in-africa.html' target='_blank'>2019 Innovation and Appropriate Technology in Africa Conference</a> as well as Faculty Choice at the <a href='https://sites.google.com/umich.edu/umsistudentexposition/spring-2020-virtual-exposition' target='_blank'>2020 UMSI Spring Exposition</a>.",
        "artifact": "websiteview.png",
        "artifactAlt": "Interactive map screenshot",
        "examine": {
            0: {
                "txt": "Through <span class='keyword'>stakeholder conversations</span> with the museum administration, we gained a clear understanding of the project goal being an interactive map embedded on the museum’s public website that presented the pre-apartheid history of the District Six community. The museum staff stressed to us the importance of apartheid history to South Africans, especially since there were still many living survivors. Maps from the era were particularly treasured because they served as proof of the thriving communities beforehand and the barren lots after, which is why they believed that adding a map to the museum website could serve as a mark of identity as well as an educational resource. What was left open for our team to determine was the specific content that map would contain, how the map would be integrated into the museum’s website, and how a website visitor would explore and interact with the map.",
                "img": {
                    0: "cntravelerdistrictsixmuseum.jpg",
                    1: "quote.jpg",
                },
                "alt": {
                    0: "The District Six Museum was established in an old church building, and its main room hosts a gallery of artifacts from District Six. The centerpiece is the large floor map of District Six's streets, on which former residents have scrawled notes about the places where they lived, worked, and played.",
                    1: "This quote by a former resident of District Six captures the diversity of life within the community prior to the arrival of the apartheid policies that dismantled it. The quote was printed on an otherwise blank wall in the District Six Homecoming Centre next door to the museum that serves as an additional heritage learning center, community gathering space, and event venue.",
                },
            },
            1: {
                "txt": "The <span class='keyword'>design attributes</span> that our team was able to define for the map based on our initial discussions were: <ul><li>accessible: public visitors to the museum website should be able to view the map without obstacles such as account credentials or data fees</li><li>economical: museum should not incur any additional costs to host the map on their website</li><li>customizable: map must integrate and display the disparate sources and types of data with desired viewer interactions</li><li>sustainable: solution should not exceed the museum staff’s technological understanding so that they can be capable of maintaining it</li></ul>",
                "img": "",
                "alt": "",
            },
            2: {
                "txt": "We conducted a <span class='keyword'>comparator analysis</span> by researching other existing maps to gather insight on graphical layouts, information architecture, interactive features, and GIS implementation methods. A map of District Six printed in the museum’s recently published historical cookbook that highlighted some community landmarks served as a good starting point. The <a href='https://projects.lib.wayne.edu/12thstreetdetroit/exhibits/show/july23_aug41967/map' target='_blank'>Detroit 67 Project</a> was built with the Neatline plugin for Omeka CMS, plotting clickable points of interest onto a baselayer of Google Maps or OpenStreetMaps, but this implementation approach did not meet the need for historical accuracy because the baselayer would display current-day streets and buildings while the points of interest would be from a past era where the geography was different. <a href='https://arcg.is/ubmm9' target='_blank'>The St. Louis LGBTQ Map</a> used ArcGIS to produce maps very smoothly integrated into the entire webpage, but this implementation approach would likely entail subscription fees to the hosting service.",
                "img": {
                    0: "cookbook.jpg",
                    1: "arcgisproto.gif",
                },
                "alt": {
                    0: "The museum previously published a cookbook of recipes from former residents that also included a map of the community highlighting former residences and key landmarks.",
                    1: "From researching existing online interactive maps, we tried to replicate their implementation methods to understand the capabilities and limitations afforded by those systems. The test captured in these images was built on ArcGIS Online, which we concluded would not be appropriate for this project because of its subscription fees.",
                },
            },
        },
        "experiment": {
            0: {
                "txt": "Multiple <span class='keyword'>sketching</span> sessions were held to generate ideas for the map layout, content structure, and interactive features. Having a variety of concepts allowed us to discuss the benefits of different design features and combine ideas that might work well together. Sketching enabled brainstormed concepts to be explored and expanded upon, and visualizing them helped us to determine more clearly which features were promising to proceed with and which might need to be tabled.",
                "img": {
                    0: "sketchdesktop1.jpg",
                    1: "sketchdesktop2.jpg",
                    2: "sketchdesktop3.jpg",
                    3: "sketchmobile1.jpg",
                    4: "sketchmobile2.jpg",
                },
                "alt": {
                    0: "Some of my sketches showing former residents' personally significant locations on a highlighted path to represent possible paths they may have taken through the community.",
                    1: "A teammate's sketches introduced the ideas of audio players to be able to include the former residents' telling their own stories in their own voices as well as image carousels to be able to present more historical photos in less screen interface real estate.",
                    2: "A teammate's sketches initiated the general graphical layout and navigational heirarchy that were further developed.",
                    3: "My sketches experimenting with graphical layouts for a mobile version of the map. The primary issue we encountered in this exercise was that the limited screen real estate of a mobile device made it difficult to allocate sufficient space to the map, the images, and the text in a manner without being overly cluttered.",
                    4: "A teammate's sketches illustrating additional layout variations for a mobile version of the map.",
                },
            },
            1: {
                "txt": "<span class='keyword'>Digital prototypes</span> were created prior to meeting again with the museum administration, and their approval set these as an initial design direction to begin building. A <a href='districtsix/digitalprototypedesktop.pdf' target='_blank'>prototype of the desktop version of the map</a> was a multipage PDF built using Adobe Illustrator with mouse click interactions simulated by hyperlinks to different pages. A <a href='https://figma.com/proto/YC8xfxRYXYLaYJarzpc6jv7F/District-Six-Museum-Wireframe?node-id=17%3A46&scaling=scale-down&redirected=1' target='_blank'>prototype of the mobile version</a> was built using Figma, an online collaborative digital interface wireframming and prototyping platform.",
                "img": {
                    0: "digitalprototypedesktop.png",
                    1: "digitalprototypemobile.png",
                },
                "alt": {
                    0: "The digital prototype for the desktop version of the map was built using Adobe Illustrator, and it is accessible through this link: <a href='districtsix/digitalprototypedesktop.pdf' target='_blank'>DigitalPrototypeDesktop.pdf</a>",
                    1: "The digital prototype for the mobile version of the map was built using Figma, and the interactive version is accessible above and also through this link: <a href='https://figma.com/proto/YC8xfxRYXYLaYJarzpc6jv7F/District-Six-Museum-Wireframe?node-id=17%3A46&scaling=scale-down&redirected=1' target='_blank'>figma.com/proto/YC8xfxRYXYLaYJarzpc6jv7F/District-Six-Museum-Wireframe</a>.",
                },
            },
        },
        "embed": {
            0: {
                "txt": "Particular <span class='keyword'>interaction features</span> were programmed to support exploration of the large quantity of content contained within the map:<ul><li>togglable layers allowed focusing on particular content such as individual resident’s stories or groups of community landmarks by graphically highlighting the selected layer’s points of interest and gently fading the rest</li><li>image slideshows enabled scrolling through photos taken over the course of each resident’s life without overcrowding the screen</li><li>an image overlay would cover the screen upon clicking any individual image, making the historical photos larger for better viewing as well as displaying accompanying textual descriptions about their significance</li><li>audio players lent an additional dimension of immersion through recordings of residents discussing life in District Six in their own voices</li></ul>",
                "img": {
                    0: "map.gif",
                },
                "alt": {
                    0: "Screenshots of the map demonstrating some of the interactive features. The map alone can be interacted with through this link: <a href='https://districtsixmuseum.github.io/memorymappingproject' target='_blank'>districtsixmuseum.github.io/memorymappingproject</a>",
                },
            },
            1: {
                "txt": "We built an <span class='keyword'>implementation process</span> to integrate the disparate pieces produced by the different members of the team. District Six community landmark data collected from the museum archives as well as data points of former residents’ life stories gathered from interviews organized in Excel spreadsheets and historical building footprints outlined in Illustrator were imported into open source <a href='https://qgis.org' target='_blank'>QGIS mapping software</a> where they were geolocated and assigned to corresponding map layers. From QGIS, the <a href='https://github.com/tomchadwin/qgis2web' target='_blank'>qgis2web plugin</a> exported that compiled map to a HTML, CSS, and JavaScript web code representation on top of which additional features were developed including toggleable layers and embedding historical photos and audio recordings. This fully developed code was uploaded to a <a href='https://github.com/districtsixmuseum/memorymappingproject' target='_blank'>GitHub repository</a> on a new account created on behalf of the museum, and to have the interactive map rendered online we inserted an iframe element linking to the GitHub-hosted code on a <a href='https://districtsix.co.za/project/st-marks-memory-mapping-project' target='_blank'>dedicated webpage</a> on the <a href='https://districtsix.co.za' target='_blank'>museum’s WordPress website</a>.",
                "img": "",
                "alt": "",
            },
            2: {
                "txt": "At the close of the project, we included <span class='keyword'>sustainability recommendations</span> in our deliverables submitted to the museum administration. In addition to describing further work that could be undertaken to enhance the interactive map such as evaluating visitor navigation as well as implementing the mobile version that was determined to be beyond scope with our timeline, we included a conceptual breakdown of domain knowledge and technological capabilities that the museum should consider bringing into their staff to be able to continue to engage in these types of digital scholarship projects going forward.",
                "img": {
                    0: "recommendations.png",
                },
                "alt": {
                    0: "This section included in the final report that we submitted to the museum administration captured our recommendations for how the museum might consider upskilling themselves or recruiting into their staff to be able to continue engaging in digital scholarship projects moving forward.",
                },
            },
        },
        "thumbnail": "thumbnail.png",
        "active": "1",
        "extra": "",
    },
    "murphybed": {
        "title": "Murphy Folding Bed Frame Build",
        "tags": "product design, ergonomic analysis, manufacturing",
        "subtitle": "To live in a 200-square-foot apartment, I needed to adjust to optimize living space. Since a bed would take up much of the available area despite only being used for a third of each day living there, I considered getting a Murphy bed frame that could be folded up against the wall when not in use. For this project, I<ul><li><span class='keyword'>conducted market research</span> on existing products to conclude that they were all beyond my budget and also to gather design ideas</li><li><span class='keyword'>evaluated ergonomics</span> to incorporate into the features</li><li><span class='keyword'>used 3D modeling software</span> to design a folding bedframe</li><li><span class='keyword'>manufactured and assembled</span> this design using salvaged materials</li></ul><br>I used this bed frame for 2 years before moving out of the apartment and out of the state, at which point I disassembled the frame and gave the parts to the university workshop where I manufactured them.",
        "artifact": "bedframe.jpg",
        "artifactAlt": "",
        "examine": {
            0: {
                "txt": "The <span class='keyword'>design attributes</span> could be quickly defined because I personally understood the scope, goals, and constraints of the project that I hoped to achieve:<ul><li>space-efficient: the design needed to fit within the dimensions of the apartment, and ideally it should integrate other space-saving features</li><li>economical: the money and time cost of materials, manufacturing, and assembly must be kept low</li><li>ergonomic: only a reasonable amount of energy should be required to convert between positions, and all interfaces must be comfortable for interactions with my physical characteristics</li><li>durable: the solution has to withstand the stress of daily use for its lifetime</li><li>simple: the solution must be designed and manufactured by me using available resources and processes</li></ul>",
                "img": {
                    0: "ergonomic.png",
                },
                "alt": {
                    0: "My body is shorter and thinner than average, and therefore commonly available furniture options (even office furniture intended to be ergonomic) are uncomfortable for me because they were designed to be able to accommodate individuals with longer limbs and wider frames. If I were to incorporate seating space into this bed frame design, then the seating dimensions should fit my dimensions and allow my knees to bend at a right angle with my feet flat on the floor for optimal ergonomic positioning.",
                },
            },
            1: {
                "txt": "Conducting <span class='keyword'>market research</span> on existing products provided insight into methods of accomplishing the core folding function as well as into other design features that may or may not be desirable:<ul><li>spring-assisted folding reduces the amount of energy required to lift the bedframe</li><li>hinge systems enable folding through less space usage</li><li>cabinets, drawers, and shelves provide storage space, obscure articulating mechanisms for cleaner appearance, and block access to them to prevent injury</li><li>pocket space that bed folds up into lends a cleaner appearance to the folded-up position</li><li>seating space made available in the folded-up position</li></ul>",
                "img": "",
                "alt": "",
            },
        },
        "experiment": {
            0: {
                "txt": "3D modeling with CAD software served to <span class='keyword'>prototype</span> various design concepts. Through this trial-and-error process, it was able to be decided to omit certain features for the sake of simplifying the design. This allowed for a reduction in the amount of necessary time and care in manufacturing as well as the reduction of potential failure points with features improperly handled. Features considered but dropped from the final design included:<ul><li>folding legs that would stow flush against the bed frame when put up and deploy when the frame is set down introduced concerns of not being sturdy enough to support a full weight</li><li>restraints for securing the mattress against the bed frame were determined to not be necessary since the mattress did not shift much with frame folding</li><li>springs and linkages to reduce the manual force necessary to fold the bed frame were determined to not be necessary since the combined weight of the frame and mattress was manageable</li></ul>",
                "img": {
                    0: "cadup.png",
                    1: "caddown.png",
                },
                "alt": {
                    0: "",
                    1: "",
                },
            },
        },
        "embed": {
            0: {
                "txt": "The <span class='keyword'>design features</span> of the final version to be manufactured were:<ul><li>folding where the folded-up position is maintained by center of gravity being past the tipping point</li><li>ergonomic seating bench available in the folded-up position</li><li>storage space underneath the bench</li><li>stain and polyurethane finish to cover rough edges and potential splinters with a smooth surface, to improve durability such as protecting against water damage, and for a nicer visual appearance</li></ul>",
                "img": {
                    0: "outline.png",
                    1: "up.jpg",
                    2: "down.jpg",
                },
                "alt": {
                    0: "In the folded-up orientation, the mattress leans against the wall with the center of gravity sufficiently past the pivot point such that it will not fold down accidentally. Folding the frame up also reveals seating space that suits the dimensions of my limbs.",
                    1: "The final manufactured and assembled bed frame fit the dimensions of my apartment very well. Folding up the frame grants access to the storage space underneath, some of which was used to store the support legs. One drawback of this design was that it was very tall in the folded-up orientation because the entire length of the mattress sat atop a bench, so tall that a residence of typical room height perhaps would not be able to accommodate it.",
                    2: "Having never previously designed and built furniture, I initially had concerns about the stability of this bed frame. Those concerns proved to be unwarranted as the design and manufacturing quality of the structure were plenty sturdy, and improvements to the support legs over time further increased stability.",
                },
            },
            1: {
                "txt": "For <span class='keyword'>ecological impact reduction</span> (and complimentary cost savings), I sourced materials such as bamboo plywood and scrap wood from a local environmentally-friendly materials distributor. This stock was cut to size and shape using the tools available in a local workshop, and the leftover scrap was donated to the workshop following manufacturing and assembly.",
                "img": {
                    0: "assembly.jpg",
                    1: "upcycle.jpg",
                    2: "stain.jpg",
                },
                "alt": {
                    0: "Much of the frame was cut from old storage shelves that were being scrapped by a local business. This setup of clamping the planks to keep them upright allowed me to line up the parts to drill screw holes.",
                    1: "To conserve material, some parts were made by combining leftover pieces that otherwise would have gone to waste.",
                    2: "Staining and polyurethaning the parts afforded them additional durability against wear and tear.",
                },
            },
            2: {
                "txt": "The legs supporting the folded-down position underwent <span class='keyword'>design interactions</span> over the course of using the bed frame. The first iteration was produced quickly in order to be able to begin using the bed as soon as possible, but their instability and fragility due to pressure concentration soon demanded a reconsideration. The second iteration was sized to fit neatly within the bottom storage compartment when not in use, and its frame-like construction enabled ease of handling since a single hand could grasp multiple from various orientations, but this design also eventually proved to have structural flaws. The third and final iteration resolved the durability issue as these legs survived to the end of the bed frame’s use while retaining the proven desirable features of easy storage and easy handling of the previous design.",
                "img": {
                    0: "legiteration.jpg",
                    1: "legscomponents.jpg",
                    2: "legsfinal.jpg",
                },
                "alt": {
                    0: "From left to right, the progression of design iterations of the support legs. The first was made quickly due to time constraints. The second distributed weight over a larger surface and could be easily handled. The last incorporated hand holds into a stronger structure.",
                    1: "The parts that went into the final leg design.",
                    2: "The manufactured and assembled final set of legs.",
                },
            },
        },
        "thumbnail": "thumbnail.jpg",
        "active": "1",
        "extra": "",
    },
    "portfolio": {
        "title": "Portfolio",
        "tags": "experience design, interaction design, implementation",
        "subtitle": "This website was designed and programmed from the ground up to highlight some of the work I have engaged in alongside collaborators and also to capture the thought processes that advanced the work. The details of each work are structured along an outline of the design process of<ul><li><span class='keyword'>examine</span> a problem space for potential design opportunities</li><li><span class='keyword'>experiment</span> with various ideas for addressing the problem</li><li><span class='keyword'>embed</span> a design in the environment</li></ul>to provide a semblence of narrative sequence, but in reality a lot of design work is nonlinear with significant branching and backtracking, where the single presentable outcome alone merely demonstrates the surface level of all the insights gained from the variety of earlier experiments.<br><br>Each image in the gallery below represents a separate work. Hovering the mouse over an image below will update this upper section with an overview of that work. Clicking an image below will link to its corresponding page (if one exists) that details that work.<br><br>On each work's page, images can be clicked to view a larger version (or sometimes an interactive piece) accompanied by a more detailed description. Some images have been placed in carousels with left and right arrows that can be clicked to view additional images.",
        "artifact": "designprocessmodel_opaque.png",
        "artifactAlt": "",
        "examine": {
            0: {
                "txt": "",
                "img": "",
                "alt": "",
            },
        },
        "experiment": {
            0: {
                "txt": "",
                "img": "",
                "alt": "",
            },
        },
        "embed": {
            0: {
                "txt": "",
                "img": "",
                "alt": "",
            },
        },
        "thumbnail": "logo.png",
        "active": "",
        "extra": "",
    },
    "recycleannarbor": {
        "title": "Recycle Ann Arbor Database and Process Consulting",
        "tags": "client consulting, industry benchmarking, qualitative data collection and synthesis",
        "subtitle": "",
        "artifact": "",
        "artifactAlt": "",
        "examine": {
            0: {
                "txt": "",
                "img": "",
                "alt": "",
            },
            1: {
                "txt": "",
                "img": "",
                "alt": "",
            },
            2: {
                "txt": "",
                "img": "",
                "alt": "",
            },
            3: {
                "txt": "",
                "img": "",
                "alt": "",
            },
        },
        "experiment": {
            0: {
                "txt": "",
                "img": "",
                "alt": "",
            },
            1: {
                "txt": "",
                "img": "",
                "alt": "",
            },
            2: {
                "txt": "",
                "img": "",
                "alt": "",
            },
            3: {
                "txt": "",
                "img": "",
                "alt": "",
            },
        },
        "embed": {
            0: {
                "txt": "",
                "img": "",
                "alt": "",
            },
            1: {
                "txt": "",
                "img": "",
                "alt": "",
            },
            2: {
                "txt": "",
                "img": "",
                "alt": "",
            },
            3: {
                "txt": "",
                "img": "",
                "alt": "",
            },
        },
        "thumbnail": "thumbnail.png",
        "active": "",
        "extra": "",
    },
    "skim": {
        "title": "SKIM Ann Arbor Local News Publication Service Design",
        "tags": "service design, design evaluation, behavioral research, quantitative data analysis",
        "subtitle": "Low voter turnout among young adults in local elections motivated our team to explore the factors contributing to low civic engagement (political participation, community volunteering, seeking information about civic issues, etc.). Additionally, university students face particular challenges to becoming engaged with the broader local community. To address this issue, we<ul><li><span class='keyword'>reviewed research literature</span> about trends in civic engagement</li><li><span class='keyword'>interviewed and surveyed</span> members of the target demographic</li><li><span class='keyword'>defined design objectives</span> based on student needs</li><li><span class='keyword'>brainstormed numerous ideas</span> that tried to address the problem</li><li><span class='keyword'>iteratively prototyped one idea</span> to capture the design objectives</li><li><span class='keyword'>conducted user testing</span> to verify functionality and validate projected adoption</li></ul><br>Our final design was a newsletter production service where students in a journalism course conduct research into local issues in collaboration with community residents, write actionable short-form news articles, and distribute them to the university population via email and digital displays on campus.",
        "artifact": "thumbnail.png",
        "artifactAlt": "",
        "examine": {
            0: {
                "txt": "Our team conducted a <span class='keyword'>literature review</span> of published research on the characteristics of groups who were or were not civically engaged and the factors that influenced their likelihood of participating in such activities. From this initial overview, we were able to identify that university students comprised a large population with particular barriers. Since university students would be plentifully accessible in our local environment throughout the course of the project, we decided to focus our scope to target the needs and goals of university students with regard to civic engagement.",
                "img": {
                    0: "stakeholdermap.png",
                },
                "alt": {
                    0: "",
                },
            },
            1: {
                "txt": "We wrote and distributed a <span class='keyword'>survey</span> to a broader group of students in hopes of seeing relevant trends. We received 130 responses, and to analyze them we computed summary statistics with frequencies and compared across groups with two-way cross-tabulation and chi-square tests for discrete choice questions with nominal or ordinal response data, and we computed summary statistics with means and standard deviations and compared across groups with mean comparison, one-way analysis of variance (ANOVA), and independent samples t-tests for interval questions with continuous response data. Our findings echoed those from our literature review, revealing that young adult residents of our own local community participated less in civic engagement activities and rated their importance as lower compared to older residents of the local community.",
                "img": {
                    0: "survey.png",
                    1: "survey2.png",
                },
                "alt": {
                    0: "",
                    1: "",
                },
            },
            2: {
                "txt": "We invited several students to participate in contextual inquiry <span class='keyword'>interviews and focus groups</span> to get a deeper understanding of the needs, goals, and barriers of university students regarding civic engagement. This qualitative data was analyzed using affinity diagramming, and our findings included that Ann Arbor being a politically vocal space can be intimidating, that lack of connection to community leads to non-engagement, that parsing through a large amount of daily information is difficult, and that civic activities that have direct, quick impact are more motivating.",
                "img": "",
                "alt": "",
            },
            3: {
                "txt": "From our research, we concluded that the <span class='keyword'>design attributes</span> that a solution should address are:<ul><li>engender a sense of community stake so that transplants and temporary residents feel a sense of ownership with local issues</li><li>information must be parsable and trustworthy for people to digest it</li><li>should recommend specific actions to take so that people are more likely to act at all</li></ul>",
                "img": {
                    0: "prioritization.png",
                },
                "alt": {
                    0: "",
                },
            },
        },
        "experiment": {
            0: {
                "txt": "We <span class='keyword'>brainstormed</span> a variety of approaches to increasing civic engagement, and we found that our ideas could be roughly grouped into 3 categories: short-form student-run media, college-led initiatives, and student-community integration programs.",
                "img": {
                    0: "brainstorm.png",
                    1: "brainstorm2.png",
                    2: "brainstorm3.png",
                },
                "alt": {
                    0: "",
                    1: "",
                    2: "",
                },
            },
            1: {
                "txt": "Our team was the most enthusiastic about a student-run short-form news publication, so we proceeded to <span class='keyword'>sketch</span> some initial drafts of how it might look. We settled on a newsletter design that specifically targeted the design attributes:<ul><li>local issues are written from the perspective of how it relates to university students</li><li>articles are condensed to a handful of sentences that get the point across quickly</li><li>highlighted links make it clear to the reader what next step they should take</li></ul>",
                "img": {
                    0: "sketch.jpg",
                    1: "sketch2.jpg",
                },
                "alt": {
                    0: "",
                    1: "",
                },
            },
            2: {
                "txt": "We mocked up a <span class='keyword'>digital prototype</span> of a newsletter, and we invited a university student to conduct some preliminary testing with it. Using an eye-tracking device, we observed which areas of the newsletter layout the individual's focus was drawn to, and this gave us good insight on how to iterate on the design.",
                "img": "",
                "alt": "",
            },
        },
        "embed": {
            0: {
                "txt": "We expanded our initial design from simply the format and content of a newsletter to encompass the newsletter production process, and this final design is captured in a <span class='keyword'>service blueprint</span>. Through a university course, students would conduct research into local issues alongside community resident partners, synthesize the data into the short format newsletter snippets, and then submit these as assignments for the faculty leading the course to proceed with editing and distribution to the student body at large. We believed that this incorporation of an engaged learning experience would significantly increase the sense of community stake among students who participate.",
                "img": {
                    0: "serviceblueprint.png",
                },
                "alt": {
                    0: "",
                },
            },
            1: {
                "txt": "For design verification of the newsletter, we conducted <span class='keyword'>usability testing</span> by inviting university students to participate in guided sessions. We presented them the digital prototype of the newsletter, timed how long it took them to read through it, tested their ability to recall the content, and asked them to rate it in terms of readability, relevance, and actionability.",
                "img": {
                    0: "objectiveprotocol.png",
                },
                "alt": {
                    0: "",
                },
            },
            2: {
                "txt": "For design validation of the newsletter, we conducted <span class='keyword'>guerilla testing</span> by emailing the digital prototype dressed up as a real newsletter publication to some of the university students who had signed up to participate in sessions without clueing them into the fact that this would be part of the session. Then, during their scheduled meeting time, we asked them whether they saw a certain email arrive in their inbox and whether they had opened it. All of our guerilla testing participants reported having opened it, which indicated to us that an email distribution might be a valid way to communicate news on local issues.",
                "img": {
                    0: "guerillaprotocol.png",
                },
                "alt": {
                    0: "",
                },
            },
            3: {
                "txt": "For design validation of the production process, we interviewed a former journalism student turned practicing professional journalist. After presenting the design, the individual remarked that they wished there could have been such a hands-on immersive learning opportunity during their time in college and that they believed students would very likely be interested in taking such a course as a means of getting exposure to and experience in news writing.",
                "img": "",
                "alt": "",
            },
        },
        "thumbnail": "thumbnail.png",
        "active": "1",
        "extra": "",
    },
    "umlibrary": {
        "title": "U-M Library Digital Scholarship Experience Research",
        "tags": "literature review, interview, qualitative data analysis",
        "subtitle": "Digital scholarship involves the use of digital technologies in creating and sharing knowledge, such as scanning archival materials to make accessible online, scraping social media to conduct sentiment analyses, incorporating virtual reality into a course curriculum, etc. The University of Michigan Library system was rethinking how to provide support for researchers and educators on digital scholarship projects. To approach this problem, we<ul><li><span class='keyword'>had conversations with librarians</span> to understand their experiences and goals when providing support on digital scholarship projects</li><li><span class='keyword'>conducted a literature review</span> of how other institutions conceptualized digital scholarship and implemented support services and programs</li><li><span class='keyword'>interviewed researchers and educators</span> who had previously received support from the library on digital scholarship projects to understand their needs and processes when seeking assistance</li><li><span class='keyword'>provided a set of recommendations</span> to the library based on the data gathered</li><li><span class='keyword'>brainstormed initial ideas</span> aimed at acting on the recommendations to improve the library's ability to support digital scholarship projects</li></ul><br>Our findings included that<ul><li>many digital scholarship services being decentralized among different departments around campus makes them hard to access</li><li>researchers often don't know enough about the kind of support that they need, so they have difficulty finding appropriate support and articulating questions</li><li>researchers tend to rely on previously established connections with individual librarians to initiate discussions about getting support</li><li>the university library's website is perceived as being frustrating to navigate so it is generally avoided, causing the useful information available there to be missed</li></ul>",
        "artifact": "poster.png",
        "artifactAlt": "",
        "examine": {
            0: {
                "txt": "",
                "img": "",
                "alt": "",
            },
            1: {
                "txt": "",
                "img": "",
                "alt": "",
            },
            2: {
                "txt": "",
                "img": "",
                "alt": "",
            },
            3: {
                "txt": "",
                "img": "",
                "alt": "",
            },
        },
        "experiment": {
            0: {
                "txt": "",
                "img": "",
                "alt": "",
            },
            1: {
                "txt": "",
                "img": "",
                "alt": "",
            },
            2: {
                "txt": "",
                "img": "",
                "alt": "",
            },
            3: {
                "txt": "",
                "img": "",
                "alt": "",
            },
        },
        "embed": {
            0: {
                "txt": "",
                "img": "",
                "alt": "",
            },
            1: {
                "txt": "",
                "img": "",
                "alt": "",
            },
            2: {
                "txt": "",
                "img": "",
                "alt": "",
            },
            3: {
                "txt": "",
                "img": "",
                "alt": "",
            },
        },
        "thumbnail": "thumbnail.png",
        "active": "",
        "extra": "",
    },
    "veggiefresh": {
        "title": "VeggieFresh Consumer Food Storage Product Design",
        "tags": "product design, market research, quantitative data analysis, design engineering, business planning",
        "subtitle": "In the United States, 21% of the total food supply is lost at the individual consumer level - about 90 billion pounds of waste costing $450 per person per year. To address this issue, our team<ul><li><span class='keyword'>surveyed shoppers and home cooks</span> to learn about behaviors and concerns</li><li><span class='keyword'>researched the market of food storage products</span> to identify gaps and opportunities</li><li><span class='keyword'>defined design objectives</span> based on consumer needs</li><li><span class='keyword'>brainstormed</span> a diversity of potential ideas</li><li><span class='keyword'>iteratively prototyped</span> one design that best fit the objectives</li><li><span class='keyword'>conducted functional analyses</span> to validate that the design addressed consumer needs</li><li><span class='keyword'>outlined a business plan</span> for manufacturing, distribution, and sale</li></ul><br>Our final design was an in-fridge, container storage vacuum preservation system that improves shelf life and visibility of stored food.",
        "artifact": "cad4.png",
        "artifactAlt": "Physical prototype manufactured to demonstrate the form and function of the final designed consumer product",
        "examine": {
            0: {
                "txt": "Through exploratory <span class='keyword'>surveys and interviews</span>, our team learned that people share many common pain points regarding food waste including:<ul><li>people tend not to be aware of how much food they are actually throwing away</li><li>food is purchased with aspirations to cook tasty and healthy meals, but oftentimes people are too tired after work or too busy with other responsibilities, so the food sits for an extended amount of time</li><li>refrigerators are not kept organized and individual items can easily become lost in the clutter</li><li>people feel particularly guilty about throwing out fresh produce that has gone bad because their spoilage is fast and distinctly visible</li></ul>From these insights, we drafted a storyboard and a few personas to aid us in conceptualizing the individuals and their needs and goals with regard to this problem and our designed solution.",
                "img": {
                    0: "storyboard.png",
                    1: "personas.png",
                },
                "alt": {
                    0: "",
                    1: "",
                },
            },
            1: {
                "txt": "We conducted <span class='keyword'>market research</span> on available products related to the topic of produce storage and preservation. We found a large variety of food-safe containers, refrigerator compartments and add-ons, and vacuum sealing products aimed at the home consumer that were used to construct a market positioning map. We felt that existing options addressed either the identified issues of visiblity or preservation, but none addressed the combination of both. Therefore, we aimed to fill this market opportunity.",
                "img": {
                    0: "marketmap.png",
                },
                "alt": {
                    0: "",
                },
            },
            2: {
                "txt": "Based on our research, we outlined <span class='keyword'>design attributes</span> of the intended solution with the 3 most important being:<ul><li>improve the preservation of stored produce</li><li>improve the visibility of stored produce</li><li>be affordable for an individual consumer to purchase</li></ul>These design attributes were mapped to measurable design objectives that could then be used later in the design process to evaluate the success of our solution.",
                "img": {
                    0: "attributesobjectives.png",
                },
                "alt": {
                    0: "",
                },
            },
        },
        "experiment": {
            0: {
                "txt": "We began our brainstorming process with a <span class='keyword'>conceptual map</span> of various approaches to motivating people to consume the produce that they've purchased. This helped us to expand the types of solutions being considered and the points within the purchase-to-consume process where we might insert a solution.",
                "img": {
                    0: "conceptualmap.png",
                    1: "brainstorm.png"
                },
                "alt": {
                    0: "",
                    1: "",
                },
            },
            1: {
                "txt": "Brainstorming also helped us to learn more about the problem space, causing us to revise our list of design attributes. The brainstormed concepts were then rated against this revised list in a <span class='keyword'>Pugh chart</span> with a standard refrigerator clear crisper drawer serving as a baseline to compare against. Our team determined these ratings based on our best educated guess about how well the concept could address the attribute. From this exercise, the smart vacuum container concept was rated the best, and therefore we chose to proceed with further developing this idea.",
                "img": {
                    0: "pugh.png",
                },
                "alt": {
                    0: "",
                },
            },
            2: {
                "txt": "To move forward with the smart vacuum container concept, we conducted a <span class='keyword'>functional decomposition</span> of the various actions that such a design would entail. This activity helped us to again expand our idea generation, but now focused on the individual components and how they might integrate into one product design.",
                "img": {
                    0: "functionaldecomposition.png",
                    1: "whiteboard.jpg",
                },
                "alt": {
                    0: "",
                    1: "",
                },
            },
            3: {
                "txt": "We deployed a survey to conduct a <span class='keyword'>Kansei analysis</span> to gain insight into people's emotional reactions to different materials that we were considering using for the design. We found that people perceived plastic and glass to be cleaner surfaces than wood, given that our design concept would sit in the enclosed space of a refrigerator, and that people perceived plastic and wood as being more durable than glass. We also found that people perceived a sliding mechanism as being simpler to use than a pivoting or rotating mechanism.",
                "img": {
                    0: "kansei.png",
                    1: "kansei2.png",
                },
                "alt": {
                    0: "",
                    1: "",
                },
            },
        },
        "embed": {
            0: {
                "txt": "3D modeling was used to define the final product design, representing the following <span class='keyword'>design features</span>:<ul><li>removable storage containers made of clear, rigid, microwaveable, dishwasher-safe, BPA-free Tritan plastic</li><li>sliding dock allowing the containers to be pulled out from the refrigerator interior for better visibility of contents</li><li>vacuum pump to extract air from within the container, extending the shelf life of the contents</li><li>vacuum pump that activates upon closing the refrigerator door, operating without occupying the individual's attention and also muffling the vacuum sound</li></ul>",
                "img": {
                    0: "cad.gif",
                    1: "cad2.gif",
                    2: "cad5.5.png",
                    3: "cad8.png",
                    4: "cad10.png",
                },
                "alt": {
                    0: "",
                    1: "",
                    2: "",
                    3: "",
                    4: "",
                },
            },
            1: {
                "txt": "To evaluate the design, we built a <span class='keyword'>physical prototype</span> with functioning slide and vacuum. Running the vacuum while inside a refrigerator, the sound was barely audible, a much nicer and more streamlined experience in comparison to existing countertop vacuum food storage options which require the individual to wait for the loud vacuum operation to finish before then having to move the sealed packages into the refrigerator.",
                "img": {
                    0: "prototype.jpg",
                    1: "fridge.png",
                },
                "alt": {
                    0: "",
                    1: "",
                },
            },
            2: {
                "txt": "To optimize the design, we set up and distributed a survey to conduct a <span class='keyword'>choice-based conjoint analysis</span>. Survey responders were served numerous combinations of product dimensions associated with prices and were prompted to select from among them the option that they would purchase. Based on this data, we could calculate part-worths for the product dimensions. Mapping these results to material prices, we could then determine the product dimensions that best balanced value to consumer with production cost to generate the most profit.",
                "img": "",
                "alt": "",
            },
            3: {
                "txt": "Using the final design dimensions, we conducted a number of <span class='keyword'>engineering functionality analyses</span> to verify that the design would function as intended and validate that the design addressed the outlined design attributes. We calculated that the hand hold used for pulling out the slide has more than adequate space to accommodate the average hand size. We calculated that the plastic structure should be able to support both containers being full of water (10 pounds each) and the slide being fully extended without breaking. We calculated that the containers in the refrigerator would comprise 3% when pushed in and 7% when pulled out of an average human's near peripheral viewfield.",
                "img": {
                    0: "functionalanalysis.png",
                    1: "functionalanalysis2.png",
                    2: "functionalanalysis3.png",
                    3: "functionalanalysis4.png",
                    4: "functionalanalysis5.png",
                    5: "functionalanalysis6.png",
                    6: "functionalanalysis7.png",
                    7: "functionalanalysis8.png",
                    8: "functionalanalysis9.png",
                },
                "alt": {
                    0: "",
                    1: "",
                    2: "",
                    3: "",
                    4: "",
                    5: "",
                    6: "",
                    7: "",
                    8: "",
                },
            },
//             4: {
//                 "txt": "Manufacturing plan",
//                 "img": "",
//                 "alt": "",
//             },
//             5: {
//                 "txt": "Business plan",
//                 "img": "",
//                 "alt": "",
//             },
        },
        "thumbnail": "thumbnail.jpg",
        "active": "1",
        "extra": "",
    },
    "youngread": {
        "title": "YoungRead App for Supporting Elementary Student Reading in Rural China",
        "tags": "qualitative data analysis, iterative prototyping, business planning",
        "subtitle": "Elementary students in rural China face a combination of barriers to academic success including that many are what are known as \"left-behind children\" (\"留守儿童\") who are cared for by relatives while their parents spend most of the year working in a faraway city resulting in destabilized family life, their teachers' salaries are dependent on standardized test performance causing teachers to focus on instructing for higher scores rather than holistic learning, and that the government is more inclined to support tangible upgrades to the educational environment such as installing computers and interactive whiteboards rather than teacher training or curriculum development, among other obstacles. Some members of our team witnessed this first-hand during a summer program volunteering in a rural Chinese elementary school to establish a school library and lead reading activities with the students. To address this problem, our team<ul><li><span class='keyword'>interviewed teachers</span> who have taught in rural China to understand their experiences and perspectives</li><li><span class='keyword'>defined design objectives</span> based on the insights gained from interviews</li><li><span class='keyword'>brainstormed ideas</span> to improve teachers' teaching experience and/or students' learning experience</li><li><span class='keyword'>iteratively prototyped</span> a design by presenting working ideas to educators and incorporating feedback</li><li><span class='keyword'>outlined a business model</span> for rolling out and scaling our designed service through key partnerships</li></ul><br>Our final design was an online platform on which schools could track the books available in their libraries, identify the books that align with curriculum needs and goals, access reading activities for teachers to deploy in their classrooms, and provide students a space to share their own reflections from reading books and engaging in reading activities.<br><br>This project won 3rd prize at the <a href='https://soe.umich.edu/learning-levers' target='_blank'>2020 James A. Kelly Learning Levers competition</a> as well as the Zell Lurie Institute Innovation and Entrepreneurship Award at the <a href='https://sites.google.com/umich.edu/umsistudentexposition/spring-2020-virtual-exposition' target='_blank'>2020 UMSI Spring Exposition</a>.",
        "artifact": "poster.png",
        "artifactAlt": "",
        "examine": {
            0: {
                "txt": "",
                "img": "",
                "alt": "",
            },
            1: {
                "txt": "",
                "img": "",
                "alt": "",
            },
            2: {
                "txt": "",
                "img": "",
                "alt": "",
            },
            3: {
                "txt": "",
                "img": "",
                "alt": "",
            },
        },
        "experiment": {
            0: {
                "txt": "",
                "img": "",
                "alt": "",
            },
            1: {
                "txt": "",
                "img": "",
                "alt": "",
            },
            2: {
                "txt": "",
                "img": "",
                "alt": "",
            },
            3: {
                "txt": "",
                "img": "",
                "alt": "",
            },
        },
        "embed": {
            0: {
                "txt": "",
                "img": "",
                "alt": "",
            },
            1: {
                "txt": "",
                "img": "",
                "alt": "",
            },
            2: {
                "txt": "",
                "img": "",
                "alt": "",
            },
            3: {
                "txt": "",
                "img": "",
                "alt": "",
            },
        },
        "thumbnail": "thumbnail.png",
        "active": "",
        "extra": "",
    },
    "template": {
        "title": "",
        "tags": "",
        "subtitle": "",
        "artifact": "",
        "artifactAlt": "",
        "examine": {
            0: {
                "txt": "",
                "img": "",
                "alt": "",
            },
        },
        "experiment": {
            0: {
                "txt": "",
                "img": "",
                "alt": "",
            },
        },
        "embed": {
            0: {
                "txt": "",
                "img": "",
                "alt": "",
            },
        },
        "thumbnail": "http://www.placehold.it/200x200",
        "active": "",
        "extra": "",
    },
}
