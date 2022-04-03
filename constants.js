const colleges = [
    {
        name: "Fr. Conceicao Rodrigues College Of Engineering"
    },
    {
        name: "Thakur College Of Engineering And Technology"
    },
    {
        name: "St. Francis Institute Of Technology"
    },
    {
        name: "Thadomal Sahani College Of Engineering"
    }
]

const branch = [
    "Computer Engineering",
    "Electronics Engineering",
    "Mechanincal Engineering",
    "Production Engineering"
];

const year = [
    "First Year",
    "Second Year",
    "Third Year",
    "Fourth Year"
];

const skills = [
    "react","angular","react native","php","django","nodejs","expressjs",
];

const tags = {
    "software-engineering" : {
        "frontend-development" : ["react","vuejs"],
        "backend-development": ["express","php","nodejs"],
        "UI-UX": ["figma"],
        "ML-AI": ["numpy","pandas"],
        "blockchain": ["ipfs","crypto"],
        "AR-VR": [],
        "freelancing": []
    },
    "higher-studies" : {
        "mba" : [],
        "m.tech": [],
        "master-of-science": []
    },
    "events": {
        "hackathons": []
    }
}

module.exports = {
    colleges,
    skills,
    branch,
    year,
    tags
}