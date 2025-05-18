// Global variables to store application data
let educationLevels = [];
let careerDomains = {};
let careerPaths = {};
let allSkills = [];
let databaseStats = {};

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    // Initialize navigation
    initNavigation();
    
    // Load initial data
    fetchEducationLevels();
    fetchCareerDomains();
    fetchCareerPaths();
    fetchSkills();
    fetchDatabaseStats();
    
    // Initialize search functionality
    document.getElementById('search-button').addEventListener('click', performSearch);
    document.getElementById('search-input').addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            performSearch();
        }
    });
});

// ------ Navigation Functions ------

function initNavigation() {
    // Set up navigation menu item clicks
    const menuItems = document.querySelectorAll('.sidebar-menu li');
    menuItems.forEach(item => {
        item.addEventListener('click', function() {
            const pageName = this.getAttribute('data-page');
            navigateTo(pageName);
        });
    });
    
    // Set up card button navigation
    const cardButtons = document.querySelectorAll('.card-button');
    cardButtons.forEach(button => {
        button.addEventListener('click', function() {
            const pageName = this.getAttribute('data-page');
            navigateTo(pageName);
        });
    });
}

function navigateTo(pageName) {
    // Hide all page sections
    const allPages = document.querySelectorAll('.page-section');
    allPages.forEach(page => {
        page.classList.remove('active');
    });
    
    // Update active menu item
    const menuItems = document.querySelectorAll('.sidebar-menu li');
    menuItems.forEach(item => {
        item.classList.remove('active');
        if (item.getAttribute('data-page') === pageName) {
            item.classList.add('active');
        }
    });
    
    // Load the template if the page doesn't exist yet
    if (!document.getElementById(`${pageName}-page`)) {
        loadTemplateContent(pageName);
    }
    
    // Show the selected page
    const selectedPage = document.getElementById(`${pageName}-page`);
    if (selectedPage) {
        selectedPage.classList.add('active');
        
        // Initialize page-specific content
        switch(pageName) {
            case 'educational-pathways':
                initEducationalPathways();
                break;
            case 'education-path-analyzer':
                initEducationPathAnalyzer();
                break;
            case 'career-domains':
                displayCareerDomains();
                break;
            case 'job-roles':
                initJobRolesPage();
                break;
            case 'personalized-guidance':
                initPersonalizedGuidance();
                break;
            case 'database-explorer':
                initDatabaseExplorer();
                break;
        }
    }
}

function loadTemplateContent(pageName) {
    const template = document.getElementById(`${pageName}-template`);
    if (template) {
        const pageContent = document.getElementById('page-content');
        const newPageSection = document.createElement('div');
        newPageSection.className = 'page-section';
        newPageSection.id = `${pageName}-page`;
        newPageSection.innerHTML = template.innerHTML;
        pageContent.appendChild(newPageSection);
        
        // Add event listeners for back buttons
        if (pageName === 'domain-detail') {
            newPageSection.querySelector('#back-to-domains').addEventListener('click', () => navigateTo('career-domains'));
        } else if (pageName === 'subdomain-detail') {
            newPageSection.querySelector('#back-to-domain').addEventListener('click', () => {
                const domainName = localStorage.getItem('currentDomain');
                showDomainDetail(domainName);
            });
        } else if (pageName === 'job-role-detail') {
            newPageSection.querySelector('#back-to-subdomain').addEventListener('click', () => {
                const subdomainName = localStorage.getItem('currentSubdomain');
                showSubdomainDetail(subdomainName);
            });
        }
    }
}

// ------ Data Fetching Functions ------

function fetchEducationLevels() {
    // This would normally be an API call to get education levels
    educationLevels = [
        { id: 1, name: "High School", description: "Basic education providing general knowledge across multiple subjects." },
        { id: 2, name: "Associate's Degree", description: "2-year degree from a community college, technical college, or university." },
        { id: 3, name: "Bachelor's Degree", description: "4-year undergraduate degree from a college or university." },
        { id: 4, name: "Master's Degree", description: "Graduate degree demonstrating advanced knowledge in a specialized field." },
        { id: 5, name: "Doctoral Degree", description: "Highest academic degree representing expertise in research and advanced knowledge." },
        { id: 6, name: "Vocational Training", description: "Specialized education focusing on skills needed for a specific career path." },
        { id: 7, name: "Professional Certification", description: "Certification of skills in a particular profession or technology." }
    ];
}

function fetchCareerDomains() {
    // This would normally be an API call to get career domains and subdomains
    careerDomains = {
        "Technology": {
            description: "The technology sector includes careers related to computer systems, software development, and digital innovations.",
            trends: "Rapid growth in artificial intelligence, blockchain, cloud computing, and remote work tools.",
            growth_outlook: "Very High",
            subdomains: {
                "Software Development": {
                    description: "Creating, testing, and maintaining software applications and systems.",
                    job_roles: {
                        "Junior Software Developer": {
                            education_level: "Bachelor's Degree",
                            salary_range: "$60,000 - $90,000",
                            growth_potential: "High"
                        },
                        "Senior Software Engineer": {
                            education_level: "Bachelor's Degree",
                            salary_range: "$100,000 - $150,000",
                            growth_potential: "High"
                        },
                        "Software Architect": {
                            education_level: "Master's Degree",
                            salary_range: "$130,000 - $180,000",
                            growth_potential: "Moderate"
                        }
                    }
                },
                "Data Science": {
                    description: "Extracting insights and knowledge from structured and unstructured data.",
                    job_roles: {
                        "Data Analyst": {
                            education_level: "Bachelor's Degree",
                            salary_range: "$65,000 - $95,000",
                            growth_potential: "High"
                        },
                        "Data Scientist": {
                            education_level: "Master's Degree",
                            salary_range: "$90,000 - $140,000",
                            growth_potential: "Very High"
                        },
                        "Machine Learning Engineer": {
                            education_level: "Master's Degree",
                            salary_range: "$110,000 - $160,000",
                            growth_potential: "Very High"
                        }
                    }
                },
                "Cybersecurity": {
                    description: "Protecting systems, networks, and programs from digital attacks.",
                    job_roles: {
                        "Security Analyst": {
                            education_level: "Bachelor's Degree",
                            salary_range: "$70,000 - $100,000",
                            growth_potential: "Very High"
                        },
                        "Cybersecurity Engineer": {
                            education_level: "Bachelor's Degree",
                            salary_range: "$90,000 - $140,000",
                            growth_potential: "Very High"
                        },
                        "Chief Information Security Officer": {
                            education_level: "Master's Degree",
                            salary_range: "$150,000 - $250,000",
                            growth_potential: "Moderate"
                        }
                    }
                }
            }
        },
        "Healthcare": {
            description: "The healthcare sector involves diagnosing, treating, and preventing illness, disease, and injury.",
            trends: "Growth in telehealth, personalized medicine, and health information technology.",
            growth_outlook: "High",
            subdomains: {
                "Medicine": {
                    description: "Diagnosing and treating health conditions in patients.",
                    job_roles: {
                        "Physician": {
                            education_level: "Doctoral Degree",
                            salary_range: "$180,000 - $300,000+",
                            growth_potential: "Moderate"
                        },
                        "Physician Assistant": {
                            education_level: "Master's Degree",
                            salary_range: "$90,000 - $130,000",
                            growth_potential: "High"
                        },
                        "Medical Assistant": {
                            education_level: "Associate's Degree",
                            salary_range: "$30,000 - $45,000",
                            growth_potential: "High"
                        }
                    }
                },
                "Nursing": {
                    description: "Providing care to patients and supporting their health and wellbeing.",
                    job_roles: {
                        "Registered Nurse": {
                            education_level: "Bachelor's Degree",
                            salary_range: "$60,000 - $100,000",
                            growth_potential: "High"
                        },
                        "Nurse Practitioner": {
                            education_level: "Master's Degree",
                            salary_range: "$90,000 - $130,000",
                            growth_potential: "Very High"
                        },
                        "Licensed Practical Nurse": {
                            education_level: "Associate's Degree",
                            salary_range: "$40,000 - $60,000",
                            growth_potential: "Moderate"
                        }
                    }
                },
                "Healthcare Administration": {
                    description: "Managing and coordinating healthcare services and facilities.",
                    job_roles: {
                        "Healthcare Administrator": {
                            education_level: "Bachelor's Degree",
                            salary_range: "$60,000 - $100,000",
                            growth_potential: "High"
                        },
                        "Hospital CEO": {
                            education_level: "Master's Degree",
                            salary_range: "$150,000 - $250,000+",
                            growth_potential: "Moderate"
                        },
                        "Medical Office Manager": {
                            education_level: "Bachelor's Degree",
                            salary_range: "$50,000 - $80,000",
                            growth_potential: "Moderate"
                        }
                    }
                }
            }
        },
        "Business": {
            description: "The business sector includes careers related to the operation and management of companies and organizations.",
            trends: "Growth in digital transformation, remote work, and sustainable business practices.",
            growth_outlook: "Moderate",
            subdomains: {
                "Finance": {
                    description: "Managing money, investments, and financial assets for individuals and organizations.",
                    job_roles: {
                        "Financial Analyst": {
                            education_level: "Bachelor's Degree",
                            salary_range: "$60,000 - $90,000",
                            growth_potential: "Moderate"
                        },
                        "Investment Banker": {
                            education_level: "Master's Degree",
                            salary_range: "$80,000 - $150,000+",
                            growth_potential: "Moderate"
                        },
                        "Financial Manager": {
                            education_level: "Bachelor's Degree",
                            salary_range: "$90,000 - $140,000",
                            growth_potential: "Moderate"
                        }
                    }
                },
                "Marketing": {
                    description: "Promoting products, services, and brands to target customers.",
                    job_roles: {
                        "Marketing Coordinator": {
                            education_level: "Bachelor's Degree",
                            salary_range: "$40,000 - $60,000",
                            growth_potential: "Moderate"
                        },
                        "Marketing Manager": {
                            education_level: "Bachelor's Degree",
                            salary_range: "$70,000 - $120,000",
                            growth_potential: "Moderate"
                        },
                        "Digital Marketing Specialist": {
                            education_level: "Bachelor's Degree",
                            salary_range: "$50,000 - $80,000",
                            growth_potential: "High"
                        }
                    }
                },
                "Human Resources": {
                    description: "Managing the people within an organization, including recruitment, training, and performance management.",
                    job_roles: {
                        "HR Assistant": {
                            education_level: "Bachelor's Degree",
                            salary_range: "$40,000 - $60,000",
                            growth_potential: "Moderate"
                        },
                        "HR Manager": {
                            education_level: "Bachelor's Degree",
                            salary_range: "$70,000 - $120,000",
                            growth_potential: "Moderate"
                        },
                        "Talent Acquisition Specialist": {
                            education_level: "Bachelor's Degree",
                            salary_range: "$50,000 - $80,000",
                            growth_potential: "Moderate"
                        }
                    }
                }
            }
        },
        "Education": {
            description: "The education sector involves teaching, training, and developing knowledge and skills in various subjects.",
            trends: "Growth in online education, personalized learning, and STEM education.",
            growth_outlook: "Moderate",
            subdomains: {
                "K-12 Education": {
                    description: "Teaching and supporting students in elementary, middle, and high schools.",
                    job_roles: {
                        "Elementary School Teacher": {
                            education_level: "Bachelor's Degree",
                            salary_range: "$40,000 - $70,000",
                            growth_potential: "Stable"
                        },
                        "High School Teacher": {
                            education_level: "Bachelor's Degree",
                            salary_range: "$45,000 - $75,000",
                            growth_potential: "Stable"
                        },
                        "School Principal": {
                            education_level: "Master's Degree",
                            salary_range: "$80,000 - $120,000",
                            growth_potential: "Limited"
                        }
                    }
                },
                "Higher Education": {
                    description: "Teaching and research at colleges and universities.",
                    job_roles: {
                        "Professor": {
                            education_level: "Doctoral Degree",
                            salary_range: "$60,000 - $130,000+",
                            growth_potential: "Limited"
                        },
                        "University Administrator": {
                            education_level: "Master's Degree",
                            salary_range: "$70,000 - $150,000",
                            growth_potential: "Limited"
                        },
                        "Academic Advisor": {
                            education_level: "Master's Degree",
                            salary_range: "$40,000 - $60,000",
                            growth_potential: "Stable"
                        }
                    }
                },
                "Educational Technology": {
                    description: "Developing and implementing technology solutions for education.",
                    job_roles: {
                        "Instructional Designer": {
                            education_level: "Master's Degree",
                            salary_range: "$60,000 - $90,000",
                            growth_potential: "High"
                        },
                        "EdTech Product Manager": {
                            education_level: "Bachelor's Degree",
                            salary_range: "$70,000 - $110,000",
                            growth_potential: "High"
                        },
                        "Learning Experience Designer": {
                            education_level: "Master's Degree",
                            salary_range: "$65,000 - $95,000",
                            growth_potential: "High"
                        }
                    }
                }
            }
        }
    };
}

function fetchCareerPaths() {
    // This would normally be an API call to get career paths
    careerPaths = {
        "Software Development Path": {
            description: "Career progression in the software development field.",
            stages: [
                "Computer Science Student",
                "Junior Developer",
                "Software Developer",
                "Senior Developer",
                "Lead Developer",
                "Software Architect",
                "Chief Technology Officer"
            ]
        },
        "Data Science Path": {
            description: "Career progression in the data science field.",
            stages: [
                "Data Science Student",
                "Data Analyst",
                "Junior Data Scientist",
                "Data Scientist",
                "Senior Data Scientist",
                "Lead Data Scientist",
                "Chief Data Officer"
            ]
        },
        "Medical Career Path": {
            description: "Career progression in the medical field.",
            stages: [
                "Pre-med Student",
                "Medical Student",
                "Resident",
                "Attending Physician",
                "Specialist",
                "Chief of Department",
                "Medical Director"
            ]
        },
        "Business Management Path": {
            description: "Career progression in business management.",
            stages: [
                "Business Student",
                "Management Trainee",
                "Team Leader",
                "Department Manager",
                "Director",
                "Vice President",
                "Chief Executive Officer"
            ]
        }
    };
}

function fetchSkills() {
    // This would normally be an API call to get skills
    allSkills = {
        "Technical Skills": [
            "Programming",
            "Data Analysis",
            "Database Management",
            "Cloud Computing",
            "Cybersecurity",
            "Machine Learning",
            "Web Development",
            "Mobile Development",
            "Network Administration",
            "DevOps"
        ],
        "Business Skills": [
            "Project Management",
            "Strategic Planning",
            "Financial Analysis",
            "Marketing",
            "Sales",
            "Customer Relationship Management",
            "Supply Chain Management",
            "Business Analysis",
            "Leadership",
            "Negotiation"
        ],
        "Healthcare Skills": [
            "Patient Care",
            "Medical Diagnosis",
            "Clinical Documentation",
            "Medical Research",
            "Pharmacology",
            "Surgery",
            "Emergency Medicine",
            "Healthcare Administration",
            "Rehabilitation",
            "Medical Imaging"
        ],
        "Education Skills": [
            "Curriculum Development",
            "Instruction",
            "Assessment",
            "Classroom Management",
            "Educational Research",
            "Special Education",
            "Online Teaching",
            "Educational Leadership",
            "Mentoring",
            "Student Advising"
        ],
        "Soft Skills": [
            "Communication",
            "Critical Thinking",
            "Problem Solving",
            "Teamwork",
            "Time Management",
            "Adaptability",
            "Creativity",
            "Emotional Intelligence",
            "Leadership",
            "Conflict Resolution"
        ]
    };
}

function fetchDatabaseStats() {
    // This would normally be an API call to get database statistics
    databaseStats = {
        domains: 4,
        subdomains: 12,
        job_roles: 36,
        skills: 50,
        career_paths: 4
    };
}

// ------ Page-Specific Initialization Functions ------

function initEducationalPathways() {
    // Populate pathway selector
    const pathwaySelect = document.getElementById('pathway-select');
    if (pathwaySelect && pathwaySelect.options.length <= 1) {
        for (const pathName in careerPaths) {
            const option = document.createElement('option');
            option.value = pathName;
            option.textContent = pathName;
            pathwaySelect.appendChild(option);
        }
        
        // Add change event listener
        pathwaySelect.addEventListener('change', function() {
            const selectedPath = this.value;
            if (selectedPath) {
                visualizeCareerPath(selectedPath);
            } else {
                document.getElementById('pathway-visualization').innerHTML = '<p class="placeholder-text">Select a pathway to visualize</p>';
                document.getElementById('pathway-details').innerHTML = '';
            }
        });
    }
}

function visualizeCareerPath(pathName) {
    const path = careerPaths[pathName];
    if (!path) return;
    
    const visualizationContainer = document.getElementById('pathway-visualization');
    const detailsContainer = document.getElementById('pathway-details');
    
    // Create pathway visualization
    let visualizationHTML = `
        <h2>${pathName}</h2>
        <p>${path.description}</p>
        <div class="pathway-diagram">
    `;
    
    // Create stages
    path.stages.forEach((stage, index) => {
        visualizationHTML += `
            <div class="pathway-stage">
                <div class="stage-number">${index + 1}</div>
                <div class="stage-name">${stage}</div>
                ${index < path.stages.length - 1 ? '<div class="stage-arrow">→</div>' : ''}
            </div>
        `;
    });
    
    visualizationHTML += '</div>';
    visualizationContainer.innerHTML = visualizationHTML;
    
    // Create pathway details
    let detailsHTML = `
        <h2>Career Path Details</h2>
        <div class="path-details">
            <h3>Key Skills Required</h3>
            <div class="skills-tags">
    `;
    
    // Add some example skills based on the path name
    let skills = [];
    if (pathName.includes('Software') || pathName.includes('Data')) {
        skills = allSkills['Technical Skills'].slice(0, 5);
    } else if (pathName.includes('Medical')) {
        skills = allSkills['Healthcare Skills'].slice(0, 5);
    } else if (pathName.includes('Business')) {
        skills = allSkills['Business Skills'].slice(0, 5);
    } else {
        skills = allSkills['Soft Skills'].slice(0, 5);
    }
    
    skills.forEach(skill => {
        detailsHTML += `<span class="skill-tag">${skill}</span>`;
    });
    
    detailsHTML += `
            </div>
            
            <h3>Education Requirements</h3>
            <div class="education-requirements">
                <p>Typical education needed for this career path:</p>
                <ul>
    `;
    
    // Add education requirements based on the path
    let educationReqs = [];
    if (pathName.includes('Software') || pathName.includes('Data')) {
        educationReqs = ["Bachelor's Degree in Computer Science or related field", "Master's Degree for advanced positions"];
    } else if (pathName.includes('Medical')) {
        educationReqs = ["Bachelor's Degree", "Medical School (MD or DO)", "Residency", "Fellowship for specialization"];
    } else if (pathName.includes('Business')) {
        educationReqs = ["Bachelor's Degree in Business or related field", "MBA for management positions"];
    } else {
        educationReqs = ["Bachelor's Degree", "Advanced degrees for specialization"];
    }
    
    educationReqs.forEach(req => {
        detailsHTML += `<li>${req}</li>`;
    });
    
    detailsHTML += `
                </ul>
            </div>
            
            <h3>Industry Outlook</h3>
            <div class="industry-outlook">
                <p>Current trends and future projections for this career path:</p>
                <ul>
    `;
    
    // Add industry outlook based on the path
    let outlook = [];
    if (pathName.includes('Software') || pathName.includes('Data')) {
        outlook = ["Very high demand across industries", "Continuous growth expected", "Remote work opportunities expanding"];
    } else if (pathName.includes('Medical')) {
        outlook = ["Stable demand with aging population", "Increasing specialization", "Growing telehealth opportunities"];
    } else if (pathName.includes('Business')) {
        outlook = ["Moderate growth expected", "Increasing demand for digital transformation skills", "Global opportunities available"];
    } else {
        outlook = ["Varies by specific field", "Adapting to technological changes", "Opportunities for specialization"];
    }
    
    outlook.forEach(point => {
        detailsHTML += `<li>${point}</li>`;
    });
    
    detailsHTML += `
                </ul>
            </div>
        </div>
    `;
    
    detailsContainer.innerHTML = detailsHTML;
}

function initEducationPathAnalyzer() {
    // Populate education level selector
    const educationLevelSelect = document.getElementById('education-level-select');
    if (educationLevelSelect && educationLevelSelect.options.length <= 1) {
        educationLevels.forEach(level => {
            const option = document.createElement('option');
            option.value = level.id;
            option.textContent = level.name;
            educationLevelSelect.appendChild(option);
        });
        
        // Add change event listener
        educationLevelSelect.addEventListener('change', function() {
            const selectedLevelId = this.value;
            if (selectedLevelId) {
                const selectedLevel = educationLevels.find(level => level.id == selectedLevelId);
                showEducationLevelOpportunities(selectedLevel);
                
                // Create job opportunities chart
                createJobOpportunitiesChart();
                
                // Create domain by education chart
                createDomainsByEducationChart(selectedLevel);
            } else {
                document.getElementById('career-opportunities').innerHTML = 
                    '<p class="placeholder-text">Select an education level to see available career opportunities</p>';
                document.getElementById('job-opportunities-chart').innerHTML = '';
                document.getElementById('domain-by-education').innerHTML = '';
            }
        });
    }
}

function showEducationLevelOpportunities(level) {
    const opportunitiesContainer = document.getElementById('career-opportunities');
    
    let opportunitiesHTML = `
        <h2>Career Opportunities with ${level.name} Education</h2>
        <p>${level.description}</p>
    `;
    
    // Find job roles for this education level
    const availableDomains = {};
    
    for (const domainName in careerDomains) {
        const domain = careerDomains[domainName];
        
        for (const subdomainName in domain.subdomains) {
            const subdomain = domain.subdomains[subdomainName];
            
            for (const jobRoleName in subdomain.job_roles) {
                const jobRole = subdomain.job_roles[jobRoleName];
                
                if (jobRole.education_level === level.name) {
                    if (!availableDomains[domainName]) {
                        availableDomains[domainName] = {
                            description: domain.description,
                            subdomains: {}
                        };
                    }
                    
                    if (!availableDomains[domainName].subdomains[subdomainName]) {
                        availableDomains[domainName].subdomains[subdomainName] = {
                            description: subdomain.description,
                            jobRoles: []
                        };
                    }
                    
                    availableDomains[domainName].subdomains[subdomainName].jobRoles.push({
                        title: jobRoleName,
                        salary_range: jobRole.salary_range,
                        growth_potential: jobRole.growth_potential
                    });
                }
            }
        }
    }
    
    if (Object.keys(availableDomains).length === 0) {
        opportunitiesHTML += `
            <div class="info-message">
                <p>No specific job roles found for ${level.name} education level. This may indicate this education level is typically a stepping stone to higher education rather than direct job roles.</p>
                
                <h3>Recommended Next Education Steps</h3>
                <p>To expand your career opportunities, consider pursuing one of these education paths:</p>
                <ul>
        `;
        
        let options = [];
        if (level.name === "High School") {
            options = ["Associate's Degree", "Bachelor's Degree", "Vocational Training", "Professional Certification"];
        } else if (level.name === "Associate's Degree") {
            options = ["Bachelor's Degree", "Professional Certification"];
        } else if (level.name === "Bachelor's Degree") {
            options = ["Master's Degree", "Professional Certification"];
        } else if (level.name === "Master's Degree") {
            options = ["Doctoral Degree", "Professional Certification"];
        } else if (level.name === "Vocational Training") {
            options = ["Associate's Degree", "Professional Certification"];
        } else {
            options = ["Additional Professional Certification", "Specialized Training"];
        }
        
        options.forEach(option => {
            opportunitiesHTML += `<li>${option}</li>`;
        });
        
        opportunitiesHTML += `
                </ul>
            </div>
        `;
    } else {
        for (const domainName in availableDomains) {
            const domain = availableDomains[domainName];
            
            opportunitiesHTML += `
                <div class="domain-section">
                    <h3>${domainName}</h3>
                    <p>${domain.description}</p>
                    
                    <div class="subdomains-list">
            `;
            
            for (const subdomainName in domain.subdomains) {
                const subdomain = domain.subdomains[subdomainName];
                
                opportunitiesHTML += `
                    <div class="subdomain-item">
                        <h4>${subdomainName}</h4>
                        <p>${subdomain.description}</p>
                        
                        <h5>Available Job Roles:</h5>
                        <table>
                            <thead>
                                <tr>
                                    <th>Job Title</th>
                                    <th>Salary Range</th>
                                    <th>Growth Potential</th>
                                </tr>
                            </thead>
                            <tbody>
                `;
                
                subdomain.jobRoles.forEach(jobRole => {
                    opportunitiesHTML += `
                        <tr>
                            <td>${jobRole.title}</td>
                            <td>${jobRole.salary_range}</td>
                            <td>${jobRole.growth_potential}</td>
                        </tr>
                    `;
                });
                
                opportunitiesHTML += `
                            </tbody>
                        </table>
                    </div>
                `;
            }
            
            opportunitiesHTML += `
                    </div>
                </div>
            `;
        }
    }
    
    opportunitiesContainer.innerHTML = opportunitiesHTML;
}

function createJobOpportunitiesChart() {
    const chartContainer = document.getElementById('job-opportunities-chart');
    chartContainer.innerHTML = '<canvas id="job-opportunities-canvas"></canvas>';
    
    // Count job roles by education level
    const educationJobCounts = {};
    educationLevels.forEach(level => {
        educationJobCounts[level.name] = 0;
    });
    
    for (const domainName in careerDomains) {
        const domain = careerDomains[domainName];
        
        for (const subdomainName in domain.subdomains) {
            const subdomain = domain.subdomains[subdomainName];
            
            for (const jobRoleName in subdomain.job_roles) {
                const jobRole = subdomain.job_roles[jobRoleName];
                if (educationJobCounts[jobRole.education_level] !== undefined) {
                    educationJobCounts[jobRole.education_level]++;
                }
            }
        }
    }
    
    // Prepare data for chart
    const labels = Object.keys(educationJobCounts);
    const data = Object.values(educationJobCounts);
    
    // Create chart
    const ctx = document.getElementById('job-opportunities-canvas').getContext('2d');
    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: labels,
            datasets: [{
                label: 'Number of Job Roles',
                data: data,
                backgroundColor: 'rgba(74, 111, 165, 0.7)',
                borderColor: 'rgba(74, 111, 165, 1)',
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            scales: {
                y: {
                    beginAtZero: true,
                    title: {
                        display: true,
                        text: 'Number of Job Roles'
                    }
                },
                x: {
                    title: {
                        display: true,
                        text: 'Education Level'
                    }
                }
            },
            plugins: {
                title: {
                    display: true,
                    text: 'Job Opportunities by Education Level'
                }
            }
        }
    });
}

function createDomainsByEducationChart(selectedLevel) {
    const domainsContainer = document.getElementById('domain-by-education');
    domainsContainer.innerHTML = `
        <h2>Popular Career Domains for ${selectedLevel.name}</h2>
        <div class="domain-chart-container">
            <canvas id="domains-by-education-canvas"></canvas>
        </div>
    `;
    
    // Count job roles by domain for the selected education level
    const domainJobCounts = {};
    
    for (const domainName in careerDomains) {
        const domain = careerDomains[domainName];
        domainJobCounts[domainName] = 0;
        
        for (const subdomainName in domain.subdomains) {
            const subdomain = domain.subdomains[subdomainName];
            
            for (const jobRoleName in subdomain.job_roles) {
                const jobRole = subdomain.job_roles[jobRoleName];
                if (jobRole.education_level === selectedLevel.name) {
                    domainJobCounts[domainName]++;
                }
            }
        }
    }
    
    // Remove domains with 0 jobs
    for (const domainName in domainJobCounts) {
        if (domainJobCounts[domainName] === 0) {
            delete domainJobCounts[domainName];
        }
    }
    
    // Prepare data for chart
    const labels = Object.keys(domainJobCounts);
    const data = Object.values(domainJobCounts);
    
    if (labels.length === 0) {
        domainsContainer.innerHTML = `
            <h2>Popular Career Domains for ${selectedLevel.name}</h2>
            <p class="info-message">No specific domains have job roles available at this education level.</p>
        `;
        return;
    }
    
    // Create chart
    const ctx = document.getElementById('domains-by-education-canvas').getContext('2d');
    new Chart(ctx, {
        type: 'pie',
        data: {
            labels: labels,
            datasets: [{
                data: data,
                backgroundColor: [
                    'rgba(74, 111, 165, 0.7)',
                    'rgba(98, 144, 200, 0.7)',
                    'rgba(231, 143, 142, 0.7)',
                    'rgba(45, 62, 80, 0.7)',
                    'rgba(156, 156, 156, 0.7)'
                ],
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            plugins: {
                title: {
                    display: true,
                    text: `Job Roles by Domain for ${selectedLevel.name}`
                },
                legend: {
                    position: 'bottom'
                }
            }
        }
    });
}

function displayCareerDomains() {
    const domainsContainer = document.getElementById('domains-container');
    
    if (domainsContainer) {
        let domainsHTML = '';
        
        for (const domainName in careerDomains) {
            const domain = careerDomains[domainName];
            
            domainsHTML += `
                <div class="domain-card" data-domain="${domainName}">
                    <h3>${domainName}</h3>
                    <p>${domain.description.substring(0, 150)}...</p>
                    <div class="domain-meta">
                        <span class="growth-outlook">Growth: ${domain.growth_outlook}</span>
                        <span class="subdomain-count">Subdomains: ${Object.keys(domain.subdomains).length}</span>
                    </div>
                    <button class="domain-button" onclick="showDomainDetail('${domainName}')">View Details</button>
                </div>
            `;
        }
        
        domainsContainer.innerHTML = domainsHTML;
    }
}

function initJobRolesPage() {
    // Populate filter dropdowns
    const domainFilter = document.getElementById('domain-filter');
    const educationFilter = document.getElementById('education-filter');
    const subdomainFilter = document.getElementById('subdomain-filter');
    
    if (domainFilter && domainFilter.options.length <= 1) {
        // Populate domain filter
        for (const domainName in careerDomains) {
            const option = document.createElement('option');
            option.value = domainName;
            option.textContent = domainName;
            domainFilter.appendChild(option);
        }
        
        // Add change event listener for domain filter
        domainFilter.addEventListener('change', function() {
            const selectedDomain = this.value;
            populateSubdomainFilter(selectedDomain);
            filterJobRoles();
        });
    }
    
    if (educationFilter && educationFilter.options.length <= 1) {
        // Populate education filter
        educationLevels.forEach(level => {
            const option = document.createElement('option');
            option.value = level.name;
            option.textContent = level.name;
            educationFilter.appendChild(option);
        });
        
        // Add change event listener for education filter
        educationFilter.addEventListener('change', function() {
            filterJobRoles();
        });
    }
    
    if (subdomainFilter) {
        // Add change event listener for subdomain filter
        subdomainFilter.addEventListener('change', function() {
            filterJobRoles();
        });
    }
    
    // Initial job roles display
    displayAllJobRoles();
}

function populateSubdomainFilter(selectedDomain) {
    const subdomainFilter = document.getElementById('subdomain-filter');
    subdomainFilter.innerHTML = '<option value="">All Subdomains</option>';
    
    if (selectedDomain) {
        const domain = careerDomains[selectedDomain];
        if (domain) {
            for (const subdomainName in domain.subdomains) {
                const option = document.createElement('option');
                option.value = subdomainName;
                option.textContent = subdomainName;
                subdomainFilter.appendChild(option);
            }
        }
    } else {
        // If no domain is selected, show all subdomains
        for (const domainName in careerDomains) {
            const domain = careerDomains[domainName];
            for (const subdomainName in domain.subdomains) {
                const option = document.createElement('option');
                option.value = `${domainName}:${subdomainName}`;
                option.textContent = `${subdomainName} (${domainName})`;
                subdomainFilter.appendChild(option);
            }
        }
    }
}

function filterJobRoles() {
    const domainFilter = document.getElementById('domain-filter').value;
    const subdomainFilter = document.getElementById('subdomain-filter').value;
    const educationFilter = document.getElementById('education-filter').value;
    
    displayAllJobRoles(domainFilter, subdomainFilter, educationFilter);
}

function displayAllJobRoles(domainFilter = "", subdomainFilter = "", educationFilter = "") {
    const jobRolesContainer = document.getElementById('job-roles-container');
    
    if (jobRolesContainer) {
        let jobRolesHTML = '';
        
        for (const domainName in careerDomains) {
            // Skip if domain filter is set and doesn't match
            if (domainFilter && domainFilter !== domainName) continue;
            
            const domain = careerDomains[domainName];
            
            for (const subdomainName in domain.subdomains) {
                // Skip if subdomain filter is set and doesn't match
                if (subdomainFilter) {
                    if (domainFilter) {
                        // When domain is filtered, subdomain value is just the name
                        if (subdomainFilter !== subdomainName) continue;
                    } else {
                        // When domain is not filtered, subdomain value includes domain name
                        if (subdomainFilter !== `${domainName}:${subdomainName}`) continue;
                    }
                }
                
                const subdomain = domain.subdomains[subdomainName];
                
                for (const jobRoleName in subdomain.job_roles) {
                    const jobRole = subdomain.job_roles[jobRoleName];
                    
                    // Skip if education filter is set and doesn't match
                    if (educationFilter && educationFilter !== jobRole.education_level) continue;
                    
                    jobRolesHTML += `
                        <div class="job-role-card" data-domain="${domainName}" data-subdomain="${subdomainName}" data-education="${jobRole.education_level}">
                            <h3>${jobRoleName}</h3>
                            <div class="job-role-path">
                                <span>${domainName}</span> &raquo; <span>${subdomainName}</span>
                            </div>
                            <div class="job-role-meta">
                                <div class="meta-item">
                                    <strong>Education:</strong> ${jobRole.education_level}
                                </div>
                                <div class="meta-item">
                                    <strong>Salary:</strong> ${jobRole.salary_range}
                                </div>
                                <div class="meta-item">
                                    <strong>Growth:</strong> ${jobRole.growth_potential}
                                </div>
                            </div>
                            <button class="job-role-button" onclick="showJobRoleDetail('${domainName}', '${subdomainName}', '${jobRoleName}')">View Details</button>
                        </div>
                    `;
                }
            }
        }
        
        if (jobRolesHTML === '') {
            jobRolesHTML = '<p class="info-message">No job roles found matching the selected filters.</p>';
        }
        
        jobRolesContainer.innerHTML = jobRolesHTML;
    }
}

function initPersonalizedGuidance() {
    // Populate education level dropdown
    const educationLevelSelect = document.getElementById('education-level');
    if (educationLevelSelect && educationLevelSelect.options.length <= 1) {
        educationLevels.forEach(level => {
            const option = document.createElement('option');
            option.value = level.name;
            option.textContent = level.name;
            educationLevelSelect.appendChild(option);
        });
    }
    
    // Populate interests checkboxes
    const interestsContainer = document.getElementById('interests-container');
    if (interestsContainer && interestsContainer.children.length === 0) {
        for (const domainName in careerDomains) {
            const checkboxItem = document.createElement('div');
            checkboxItem.className = 'checkbox-item';
            checkboxItem.innerHTML = `
                <input type="checkbox" id="interest-${domainName.toLowerCase().replace(/\s/g, '-')}" name="interests[]" value="${domainName}">
                <label for="interest-${domainName.toLowerCase().replace(/\s/g, '-')}">${domainName}</label>
            `;
            interestsContainer.appendChild(checkboxItem);
            
            // Add subdomains as interests too
            const domain = careerDomains[domainName];
            for (const subdomainName in domain.subdomains) {
                const subCheckboxItem = document.createElement('div');
                subCheckboxItem.className = 'checkbox-item';
                subCheckboxItem.innerHTML = `
                    <input type="checkbox" id="interest-${subdomainName.toLowerCase().replace(/\s/g, '-')}" name="interests[]" value="${subdomainName}">
                    <label for="interest-${subdomainName.toLowerCase().replace(/\s/g, '-')}">${subdomainName}</label>
                `;
                interestsContainer.appendChild(subCheckboxItem);
            }
        }
    }
    
    // Populate skills checkboxes
    const skillsContainer = document.getElementById('skills-container');
    if (skillsContainer && skillsContainer.children.length === 0) {
        for (const category in allSkills) {
            const skills = allSkills[category];
            
            const categoryTitle = document.createElement('h4');
            categoryTitle.textContent = category;
            skillsContainer.appendChild(categoryTitle);
            
            skills.forEach(skill => {
                const checkboxItem = document.createElement('div');
                checkboxItem.className = 'checkbox-item';
                checkboxItem.innerHTML = `
                    <input type="checkbox" id="skill-${skill.toLowerCase().replace(/\s/g, '-')}" name="skills[]" value="${skill}">
                    <label for="skill-${skill.toLowerCase().replace(/\s/g, '-')}">${skill}</label>
                `;
                skillsContainer.appendChild(checkboxItem);
            });
        }
    }
    
    // Populate industries checkboxes
    const industriesContainer = document.getElementById('industries-container');
    if (industriesContainer && industriesContainer.children.length === 0) {
        for (const domainName in careerDomains) {
            const checkboxItem = document.createElement('div');
            checkboxItem.className = 'checkbox-item';
            checkboxItem.innerHTML = `
                <input type="checkbox" id="industry-${domainName.toLowerCase().replace(/\s/g, '-')}" name="industries[]" value="${domainName}">
                <label for="industry-${domainName.toLowerCase().replace(/\s/g, '-')}">${domainName}</label>
            `;
            industriesContainer.appendChild(checkboxItem);
        }
    }
    
    // Add form submission handler
    const profileForm = document.getElementById('profile-form');
    if (profileForm) {
        profileForm.addEventListener('submit', function(e) {
            e.preventDefault();
            generateRecommendations();
        });
    }
}

function generateRecommendations() {
    // Get form data
    const educationLevel = document.getElementById('education-level').value;
    const careerGoals = document.getElementById('career-goals').value;
    
    // Get selected interests
    const interests = [];
    document.querySelectorAll('input[name="interests[]"]:checked').forEach(checkbox => {
        interests.push(checkbox.value);
    });
    
    // Get selected skills
    const skills = [];
    document.querySelectorAll('input[name="skills[]"]:checked').forEach(checkbox => {
        skills.push(checkbox.value);
    });
    
    // Get selected industries
    const industries = [];
    document.querySelectorAll('input[name="industries[]"]:checked').forEach(checkbox => {
        industries.push(checkbox.value);
    });
    
    // Create user profile
    const userProfile = {
        educationLevel,
        interests,
        skills,
        careerGoals,
        industries
    };
    
    // Generate recommendations based on profile
    const recommendations = calculateRecommendations(userProfile);
    displayRecommendations(recommendations);
}

function calculateRecommendations(userProfile) {
    const recommendations = [];
    
    // Score each job role based on profile match
    for (const domainName in careerDomains) {
        const domain = careerDomains[domainName];
        const isDomainInInterests = userProfile.interests.includes(domainName);
        const isDomainInIndustries = userProfile.industries.includes(domainName);
        
        for (const subdomainName in domain.subdomains) {
            const subdomain = domain.subdomains[subdomainName];
            const isSubdomainInInterests = userProfile.interests.includes(subdomainName);
            
            for (const jobRoleName in subdomain.job_roles) {
                const jobRole = subdomain.job_roles[jobRoleName];
                
                // Skip if education level doesn't match
                // For simplicity, let's consider "any" as a wildcard
                if (userProfile.educationLevel !== "" && 
                    userProfile.educationLevel !== "any" && 
                    jobRole.education_level !== userProfile.educationLevel) {
                    continue;
                }
                
                // Calculate match score (simplified)
                let score = 0;
                
                // Domain match
                if (isDomainInInterests) score += 20;
                if (isDomainInIndustries) score += 20;
                
                // Subdomain match
                if (isSubdomainInInterests) score += 30;
                
                // Growth potential bonus
                if (jobRole.growth_potential === "Very High") score += 15;
                else if (jobRole.growth_potential === "High") score += 10;
                else if (jobRole.growth_potential === "Moderate") score += 5;
                
                // Add the recommendation with score
                recommendations.push({
                    jobTitle: jobRoleName,
                    domain: domainName,
                    subdomain: subdomainName,
                    educationLevel: jobRole.education_level,
                    salaryRange: jobRole.salary_range,
                    growthPotential: jobRole.growth_potential,
                    matchScore: score
                });
            }
        }
    }
    
    // Sort recommendations by score (highest first)
    recommendations.sort((a, b) => b.matchScore - a.matchScore);
    
    // Return top recommendations
    return recommendations.slice(0, 5);
}

function displayRecommendations(recommendations) {
    const recommendationsContainer = document.getElementById('recommendations-container');
    const recommendationsList = document.getElementById('recommendations-list');
    
    if (recommendations.length === 0) {
        recommendationsList.innerHTML = `
            <p class="info-message">No matching career recommendations found based on your profile. Try adjusting your preferences.</p>
        `;
    } else {
        let recommendationsHTML = '';
        
        recommendations.forEach((rec, index) => {
            recommendationsHTML += `
                <div class="recommendation-card">
                    <div class="recommendation-rank">#${index + 1}</div>
                    <div class="recommendation-content">
                        <h3>${rec.jobTitle}</h3>
                        <div class="recommendation-path">
                            ${rec.domain} &raquo; ${rec.subdomain}
                        </div>
                        <div class="recommendation-details">
                            <div class="detail-item">
                                <strong>Education:</strong> ${rec.educationLevel}
                            </div>
                            <div class="detail-item">
                                <strong>Salary Range:</strong> ${rec.salaryRange}
                            </div>
                            <div class="detail-item">
                                <strong>Growth Potential:</strong> ${rec.growthPotential}
                            </div>
                            <div class="detail-item">
                                <strong>Match Score:</strong> ${rec.matchScore}%
                            </div>
                        </div>
                        <button class="job-role-button" onclick="showJobRoleDetail('${rec.domain}', '${rec.subdomain}', '${rec.jobTitle}')">View Details</button>
                    </div>
                </div>
            `;
        });
        
        recommendationsList.innerHTML = recommendationsHTML;
    }
    
    // Show recommendations container
    recommendationsContainer.style.display = 'block';
    
    // Scroll to recommendations
    recommendationsContainer.scrollIntoView({ behavior: 'smooth' });
}

function initDatabaseExplorer() {
    // Set up table navigation
    const tableNavItems = document.querySelectorAll('.database-nav li');
    tableNavItems.forEach(item => {
        item.addEventListener('click', function() {
            // Update active class
            tableNavItems.forEach(navItem => navItem.classList.remove('active'));
            this.classList.add('active');
            
            // Show selected table
            const tableName = this.getAttribute('data-table');
            showDatabaseTable(tableName);
        });
    });
    
    // Show database statistics
    showDatabaseStats();
    
    // Show first table by default
    showDatabaseTable('education-levels');
}

function showDatabaseStats() {
    const statsContainer = document.getElementById('db-stats-container');
    
    let statsHTML = '';
    
    for (const stat in databaseStats) {
        statsHTML += `
            <div class="stat-item">
                <div class="stat-name">${stat.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}</div>
                <div class="stat-value">${databaseStats[stat]}</div>
            </div>
        `;
    }
    
    statsContainer.innerHTML = statsHTML;
}

function showDatabaseTable(tableName) {
    const tableContainer = document.getElementById('table-display');
    
    switch(tableName) {
        case 'education-levels':
            let educationHTML = `
                <h3>Education Levels</h3>
                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Description</th>
                        </tr>
                    </thead>
                    <tbody>
            `;
            
            educationLevels.forEach(level => {
                educationHTML += `
                    <tr>
                        <td>${level.id}</td>
                        <td>${level.name}</td>
                        <td>${level.description}</td>
                    </tr>
                `;
            });
            
            educationHTML += `
                    </tbody>
                </table>
            `;
            
            tableContainer.innerHTML = educationHTML;
            break;
            
        case 'domains':
            let domainsHTML = `
                <h3>Domains</h3>
                <table>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Description</th>
                            <th>Growth Outlook</th>
                            <th>Subdomains Count</th>
                        </tr>
                    </thead>
                    <tbody>
            `;
            
            for (const domainName in careerDomains) {
                const domain = careerDomains[domainName];
                domainsHTML += `
                    <tr>
                        <td>${domainName}</td>
                        <td>${domain.description}</td>
                        <td>${domain.growth_outlook}</td>
                        <td>${Object.keys(domain.subdomains).length}</td>
                    </tr>
                `;
            }
            
            domainsHTML += `
                    </tbody>
                </table>
            `;
            
            tableContainer.innerHTML = domainsHTML;
            break;
            
        case 'subdomains':
            let subdomainsHTML = `
                <h3>Subdomains</h3>
                <table>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Domain</th>
                            <th>Description</th>
                            <th>Job Roles Count</th>
                        </tr>
                    </thead>
                    <tbody>
            `;
            
            for (const domainName in careerDomains) {
                const domain = careerDomains[domainName];
                
                for (const subdomainName in domain.subdomains) {
                    const subdomain = domain.subdomains[subdomainName];
                    subdomainsHTML += `
                        <tr>
                            <td>${subdomainName}</td>
                            <td>${domainName}</td>
                            <td>${subdomain.description}</td>
                            <td>${Object.keys(subdomain.job_roles).length}</td>
                        </tr>
                    `;
                }
            }
            
            subdomainsHTML += `
                    </tbody>
                </table>
            `;
            
            tableContainer.innerHTML = subdomainsHTML;
            break;
            
        case 'job-roles':
            let jobRolesHTML = `
                <h3>Job Roles</h3>
                <table>
                    <thead>
                        <tr>
                            <th>Title</th>
                            <th>Subdomain</th>
                            <th>Domain</th>
                            <th>Education Level</th>
                            <th>Salary Range</th>
                            <th>Growth Potential</th>
                        </tr>
                    </thead>
                    <tbody>
            `;
            
            for (const domainName in careerDomains) {
                const domain = careerDomains[domainName];
                
                for (const subdomainName in domain.subdomains) {
                    const subdomain = domain.subdomains[subdomainName];
                    
                    for (const jobRoleName in subdomain.job_roles) {
                        const jobRole = subdomain.job_roles[jobRoleName];
                        jobRolesHTML += `
                            <tr>
                                <td>${jobRoleName}</td>
                                <td>${subdomainName}</td>
                                <td>${domainName}</td>
                                <td>${jobRole.education_level}</td>
                                <td>${jobRole.salary_range}</td>
                                <td>${jobRole.growth_potential}</td>
                            </tr>
                        `;
                    }
                }
            }
            
            jobRolesHTML += `
                    </tbody>
                </table>
            `;
            
            tableContainer.innerHTML = jobRolesHTML;
            break;
            
        case 'skills':
            let skillsHTML = `
                <h3>Skills</h3>
                <table>
                    <thead>
                        <tr>
                            <th>Skill Name</th>
                            <th>Category</th>
                        </tr>
                    </thead>
                    <tbody>
            `;
            
            for (const category in allSkills) {
                const skills = allSkills[category];
                
                skills.forEach(skill => {
                    skillsHTML += `
                        <tr>
                            <td>${skill}</td>
                            <td>${category}</td>
                        </tr>
                    `;
                });
            }
            
            skillsHTML += `
                    </tbody>
                </table>
            `;
            
            tableContainer.innerHTML = skillsHTML;
            break;
            
        case 'career-paths':
            let pathsHTML = `
                <h3>Career Paths</h3>
                <table>
                    <thead>
                        <tr>
                            <th>Path Name</th>
                            <th>Description</th>
                            <th>Stages</th>
                        </tr>
                    </thead>
                    <tbody>
            `;
            
            for (const pathName in careerPaths) {
                const path = careerPaths[pathName];
                pathsHTML += `
                    <tr>
                        <td>${pathName}</td>
                        <td>${path.description}</td>
                        <td>${path.stages.join(' → ')}</td>
                    </tr>
                `;
            }
            
            pathsHTML += `
                    </tbody>
                </table>
            `;
            
            tableContainer.innerHTML = pathsHTML;
            break;
    }
}

// ------ Detail Page Functions ------

function showDomainDetail(domainName) {
    // Store current domain for back navigation
    localStorage.setItem('currentDomain', domainName);
    
    // Load domain detail template if not already loaded
    if (!document.getElementById('domain-detail-page')) {
        loadTemplateContent('domain-detail');
    }
    
    // Navigate to the domain detail page
    navigateTo('domain-detail');
    
    // Get domain data
    const domain = careerDomains[domainName];
    
    // Update page content
    document.getElementById('domain-title').textContent = domainName;
    document.getElementById('domain-description').textContent = domain.description;
    document.getElementById('domain-trends').textContent = domain.trends;
    document.getElementById('domain-growth').textContent = domain.growth_outlook;
    
    // Display subdomains
    const subdomainsContainer = document.getElementById('subdomains-container');
    let subdomainsHTML = '';
    
    for (const subdomainName in domain.subdomains) {
        const subdomain = domain.subdomains[subdomainName];
        
        subdomainsHTML += `
            <div class="subdomain-card">
                <h3>${subdomainName}</h3>
                <p>${subdomain.description}</p>
                <div class="job-roles-count">
                    <span>${Object.keys(subdomain.job_roles).length} job roles</span>
                </div>
                <button class="subdomain-button" onclick="showSubdomainDetail('${subdomainName}')">View Details</button>
            </div>
        `;
    }
    
    subdomainsContainer.innerHTML = subdomainsHTML;
    
    // Display skills for this domain
    displayDomainSkills(domainName);
    
    // Display education paths for this domain
    displayEducationPaths(domainName);
}

function displayDomainSkills(domainName) {
    const domainSkillsContainer = document.getElementById('domain-skills');
    
    // Determine skills based on domain name
    let skills = [];
    if (domainName === "Technology") {
        skills = allSkills["Technical Skills"];
    } else if (domainName === "Healthcare") {
        skills = allSkills["Healthcare Skills"];
    } else if (domainName === "Business") {
        skills = allSkills["Business Skills"];
    } else if (domainName === "Education") {
        skills = allSkills["Education Skills"];
    }
    
    // Add soft skills to all domains
    skills = skills.concat(allSkills["Soft Skills"].slice(0, 3));
    
    let skillsHTML = '';
    skills.forEach(skill => {
        skillsHTML += `<span class="skill-tag">${skill}</span>`;
    });
    
    domainSkillsContainer.innerHTML = skillsHTML;
}

function displayEducationPaths(domainName) {
    const educationPathsContainer = document.getElementById('education-paths');
    
    // Determine education paths based on domain
    let educationHTML = '<ul>';
    
    // Check job roles in the domain to see what education levels are required
    const educationLevelsNeeded = new Set();
    const domain = careerDomains[domainName];
    
    for (const subdomainName in domain.subdomains) {
        const subdomain = domain.subdomains[subdomainName];
        
        for (const jobRoleName in subdomain.job_roles) {
            const jobRole = subdomain.job_roles[jobRoleName];
            educationLevelsNeeded.add(jobRole.education_level);
        }
    }
    
    // Create list of recommendations
    if (educationLevelsNeeded.has("High School")) {
        educationHTML += '<li><strong>Basic Path:</strong> High School + Certifications or Vocational Training</li>';
    }
    if (educationLevelsNeeded.has("Associate's Degree")) {
        educationHTML += '<li><strong>Associate Path:</strong> Associate\'s Degree in ' + domainName + ' or related field</li>';
    }
    if (educationLevelsNeeded.has("Bachelor's Degree")) {
        educationHTML += '<li><strong>Bachelor Path:</strong> Bachelor\'s Degree in ' + domainName + ' or related field</li>';
    }
    if (educationLevelsNeeded.has("Master's Degree")) {
        educationHTML += '<li><strong>Advanced Path:</strong> Bachelor\'s + Master\'s Degree in ' + domainName + ' specialization</li>';
    }
    if (educationLevelsNeeded.has("Doctoral Degree")) {
        educationHTML += '<li><strong>Research Path:</strong> Bachelor\'s + Master\'s + Doctoral Degree for research and academia</li>';
    }
    if (educationLevelsNeeded.has("Professional Certification")) {
        educationHTML += '<li><strong>Professional Path:</strong> Degree + Industry Certifications in ' + domainName + ' specialties</li>';
    }
    
    educationHTML += '</ul>';
    educationPathsContainer.innerHTML = educationHTML;
}

function showSubdomainDetail(subdomainName) {
    // Find the subdomain in the career domains
    let foundSubdomain = null;
    let parentDomain = null;
    
    for (const domainName in careerDomains) {
        const domain = careerDomains[domainName];
        
        if (domain.subdomains[subdomainName]) {
            foundSubdomain = domain.subdomains[subdomainName];
            parentDomain = domainName;
            break;
        }
    }
    
    if (!foundSubdomain) return;
    
    // Store current subdomain and parent domain for back navigation
    localStorage.setItem('currentSubdomain', subdomainName);
    localStorage.setItem('currentDomain', parentDomain);
    
    // Load subdomain detail template if not already loaded
    if (!document.getElementById('subdomain-detail-page')) {
        loadTemplateContent('subdomain-detail');
    }
    
    // Navigate to the subdomain detail page
    navigateTo('subdomain-detail');
    
    // Update page content
    document.getElementById('subdomain-title').textContent = subdomainName;
    document.getElementById('subdomain-description').textContent = foundSubdomain.description;
    document.getElementById('parent-domain-name').textContent = parentDomain;
    
    // Display job roles
    const jobRolesContainer = document.getElementById('subdomain-job-roles');
    let jobRolesHTML = '';
    
    for (const jobRoleName in foundSubdomain.job_roles) {
        const jobRole = foundSubdomain.job_roles[jobRoleName];
        
        jobRolesHTML += `
            <div class="job-role-card">
                <h3>${jobRoleName}</h3>
                <div class="job-role-meta">
                    <div class="meta-item">
                        <strong>Education:</strong> ${jobRole.education_level}
                    </div>
                    <div class="meta-item">
                        <strong>Salary:</strong> ${jobRole.salary_range}
                    </div>
                    <div class="meta-item">
                        <strong>Growth:</strong> ${jobRole.growth_potential}
                    </div>
                </div>
                <button class="job-role-button" onclick="showJobRoleDetail('${parentDomain}', '${subdomainName}', '${jobRoleName}')">View Details</button>
            </div>
        `;
    }
    
    jobRolesContainer.innerHTML = jobRolesHTML;
    
    // Display tools & technologies for this subdomain
    displaySubdomainTools(subdomainName, parentDomain);
    
    // Display career outlook for this subdomain
    displayCareerOutlook(subdomainName, parentDomain);
}

function displaySubdomainTools(subdomainName, domainName) {
    const toolsContainer = document.getElementById('subdomain-tools');
    
    // Determine tools based on subdomain and domain
    let tools = [];
    if (domainName === "Technology") {
        if (subdomainName === "Software Development") {
            tools = ["Visual Studio Code", "Git", "Docker", "Node.js", "Python", "Java", "JavaScript Frameworks", "CI/CD Tools"];
        } else if (subdomainName === "Data Science") {
            tools = ["Python", "R", "SQL", "Jupyter Notebooks", "Pandas", "TensorFlow", "PyTorch", "Tableau", "Power BI"];
        } else if (subdomainName === "Cybersecurity") {
            tools = ["Wireshark", "Metasploit", "Nessus", "SIEM Tools", "Penetration Testing Tools", "Encryption Technologies"];
        }
    } else if (domainName === "Healthcare") {
        if (subdomainName === "Medicine") {
            tools = ["Electronic Health Records (EHR)", "Medical Imaging Technology", "Diagnostic Equipment", "Telemedicine Platforms"];
        } else if (subdomainName === "Nursing") {
            tools = ["Patient Monitoring Systems", "Medication Management Systems", "EHR Systems", "Care Planning Software"];
        } else if (subdomainName === "Healthcare Administration") {
            tools = ["Healthcare Management Systems", "Insurance Processing Software", "Scheduling Systems", "Healthcare Analytics Tools"];
        }
    } else if (domainName === "Business") {
        if (subdomainName === "Finance") {
            tools = ["Financial Analysis Software", "Excel", "QuickBooks", "SAP", "Bloomberg Terminal", "Financial Modeling Tools"];
        } else if (subdomainName === "Marketing") {
            tools = ["CRM Systems", "Google Analytics", "Social Media Management Tools", "Content Management Systems", "SEO Tools"];
        } else if (subdomainName === "Human Resources") {
            tools = ["HRIS Systems", "Applicant Tracking Systems", "Performance Management Software", "Learning Management Systems"];
        }
    } else if (domainName === "Education") {
        if (subdomainName === "K-12 Education") {
            tools = ["Learning Management Systems", "Educational Apps", "Classroom Management Software", "Assessment Tools"];
        } else if (subdomainName === "Higher Education") {
            tools = ["Academic Research Databases", "Course Management Systems", "Academic Advising Software", "Research Tools"];
        } else if (subdomainName === "Educational Technology") {
            tools = ["Course Authoring Tools", "Video Conferencing Software", "Virtual Classroom Platforms", "Learning Analytics Tools"];
        }
    }
    
    let toolsHTML = '<ul>';
    tools.forEach(tool => {
        toolsHTML += `<li>${tool}</li>`;
    });
    toolsHTML += '</ul>';
    
    toolsContainer.innerHTML = toolsHTML;
}

function displayCareerOutlook(subdomainName, domainName) {
    const outlookContainer = document.getElementById('career-outlook');
    
    // Determine outlook based on job roles in the subdomain
    const subdomain = careerDomains[domainName].subdomains[subdomainName];
    
    // Calculate average growth potential
    let growthSum = 0;
    let growthCount = 0;
    let highestSalary = "";
    let lowestSalary = "";
    
    for (const jobRoleName in subdomain.job_roles) {
        const jobRole = subdomain.job_roles[jobRoleName];
        
        // Add to growth sum
        if (jobRole.growth_potential === "Very High") growthSum += 4;
        else if (jobRole.growth_potential === "High") growthSum += 3;
        else if (jobRole.growth_potential === "Moderate") growthSum += 2;
        else if (jobRole.growth_potential === "Limited") growthSum += 1;
        else if (jobRole.growth_potential === "Declining") growthSum += 0;
        
        growthCount++;
        
        // Update salary range
        const salaryRange = jobRole.salary_range;
        if (!highestSalary || salaryRange > highestSalary) {
            highestSalary = salaryRange;
        }
        if (!lowestSalary || salaryRange < lowestSalary) {
            lowestSalary = salaryRange;
        }
    }
    
    // Calculate average growth
    const avgGrowth = growthSum / growthCount;
    let growthDescription = "";
    if (avgGrowth >= 3.5) growthDescription = "Very High";
    else if (avgGrowth >= 2.5) growthDescription = "High";
    else if (avgGrowth >= 1.5) growthDescription = "Moderate";
    else if (avgGrowth >= 0.5) growthDescription = "Limited";
    else growthDescription = "Declining";
    
    // Create outlook HTML
    let outlookHTML = `
        <div class="outlook-stat">
            <h4>Overall Growth Potential</h4>
            <p class="outlook-value">${growthDescription}</p>
        </div>
        
        <div class="outlook-stat">
            <h4>Salary Range Across Roles</h4>
            <p class="outlook-value">${lowestSalary} - ${highestSalary}</p>
        </div>
        
        <div class="outlook-details">
            <h4>Industry Trends</h4>
            <ul>
    `;
    
    // Add trends based on domain/subdomain
    let trends = [];
    if (domainName === "Technology") {
        if (subdomainName === "Software Development") {
            trends = ["Growing demand for cloud-native development", "Increased focus on cybersecurity", "Rise of AI and machine learning integration"];
        } else if (subdomainName === "Data Science") {
            trends = ["Explosion of big data applications", "Integration of AI in decision-making", "Growth in predictive analytics"];
        } else if (subdomainName === "Cybersecurity") {
            trends = ["Increasing threats and attacks globally", "Growing regulatory requirements", "Shortage of skilled professionals"];
        }
    } else if (domainName === "Healthcare") {
        if (subdomainName === "Medicine") {
            trends = ["Growth in telehealth services", "Precision medicine advancements", "Integration of AI in diagnostics"];
        } else if (subdomainName === "Nursing") {
            trends = ["Growing demand due to aging population", "Expansion of nurse practitioner roles", "Specialization in emerging areas"];
        } else if (subdomainName === "Healthcare Administration") {
            trends = ["Focus on healthcare cost reduction", "Implementation of value-based care", "Healthcare IT integration"];
        }
    } else if (domainName === "Business") {
        if (subdomainName === "Finance") {
            trends = ["Digital transformation of financial services", "Growth in fintech solutions", "Emphasis on data-driven decision making"];
        } else if (subdomainName === "Marketing") {
            trends = ["Growth in digital marketing channels", "Personalization through data analytics", "Content marketing importance"];
        } else if (subdomainName === "Human Resources") {
            trends = ["Remote work transformation", "Focus on employee wellbeing", "HR analytics growth"];
        }
    } else if (domainName === "Education") {
        if (subdomainName === "K-12 Education") {
            trends = ["Integration of technology in classrooms", "Personalized learning approaches", "Focus on STEM education"];
        } else if (subdomainName === "Higher Education") {
            trends = ["Growth in online education", "International student recruitment", "Focus on career outcomes"];
        } else if (subdomainName === "Educational Technology") {
            trends = ["Expansion of learning platforms", "Adaptive learning technologies", "Mobile educational applications"];
        }
    }
    
    trends.forEach(trend => {
        outlookHTML += `<li>${trend}</li>`;
    });
    
    outlookHTML += `
            </ul>
        </div>
    `;
    
    outlookContainer.innerHTML = outlookHTML;
}

function showJobRoleDetail(domainName, subdomainName, jobRoleName) {
    // Store current job role info for back navigation
    localStorage.setItem('currentDomain', domainName);
    localStorage.setItem('currentSubdomain', subdomainName);
    localStorage.setItem('currentJobRole', jobRoleName);
    
    // Get job role data
    const jobRole = careerDomains[domainName].subdomains[subdomainName].job_roles[jobRoleName];
    
    // Load job role detail template if not already loaded
    if (!document.getElementById('job-role-detail-page')) {
        loadTemplateContent('job-role-detail');
    }
    
    // Navigate to the job role detail page
    navigateTo('job-role-detail');
    
    // Update page content
    document.getElementById('job-role-title').textContent = jobRoleName;
    document.getElementById('job-role-domain').textContent = domainName;
    document.getElementById('job-role-subdomain').textContent = subdomainName;
    document.getElementById('required-education').textContent = jobRole.education_level;
    document.getElementById('salary-range').textContent = jobRole.salary_range;
    document.getElementById('growth-potential').textContent = jobRole.growth_potential;
    
    // Generate a job description based on the role
    let description = `A ${jobRoleName} in the ${subdomainName} field works within the broader ${domainName} sector. `;
    
    if (domainName === "Technology") {
        description += `This role involves working with digital technologies, software, and systems. `;
    } else if (domainName === "Healthcare") {
        description += `This role focuses on improving patient health outcomes and supporting healthcare delivery. `;
    } else if (domainName === "Business") {
        description += `This role contributes to organizational success through business operations and strategy. `;
    } else if (domainName === "Education") {
        description += `This role supports learning, teaching, and educational outcomes. `;
    }
    
    description += `With a growth potential rated as "${jobRole.growth_potential}" and a salary range of ${jobRole.salary_range}, this position requires a ${jobRole.education_level} level of education. The role offers opportunities for career advancement within the ${subdomainName} field.`;
    
    document.getElementById('job-role-description').textContent = description;
    
    // Display required skills
    displayJobRoleSkills(domainName, subdomainName, jobRoleName);
    
    // Display next career steps
    displayNextCareerSteps(domainName, subdomainName, jobRoleName);
}

function displayJobRoleSkills(domainName, subdomainName, jobRoleName) {
    const skillsContainer = document.getElementById('required-skills');
    
    // Determine skills based on domain, subdomain, and job role
    let skills = [];
    
    // Add domain-specific skills
    if (domainName === "Technology") {
        skills = skills.concat(allSkills["Technical Skills"].slice(0, 5));
    } else if (domainName === "Healthcare") {
        skills = skills.concat(allSkills["Healthcare Skills"].slice(0, 5));
    } else if (domainName === "Business") {
        skills = skills.concat(allSkills["Business Skills"].slice(0, 5));
    } else if (domainName === "Education") {
        skills = skills.concat(allSkills["Education Skills"].slice(0, 5));
    }
    
    // Add some soft skills
    skills = skills.concat(allSkills["Soft Skills"].slice(0, 3));
    
    // Create skills HTML
    let skillsHTML = '';
    skills.forEach(skill => {
        skillsHTML += `<span class="skill-tag">${skill}</span>`;
    });
    
    skillsContainer.innerHTML = skillsHTML;
}

function displayNextCareerSteps(domainName, subdomainName, jobRoleName) {
    const nextStepsContainer = document.getElementById('next-steps');
    
    // Find potential career paths for this job role
    let relevantPath = null;
    let currentStage = -1;
    
    if (domainName === "Technology" && (subdomainName === "Software Development" || jobRoleName.includes("Software") || jobRoleName.includes("Developer"))) {
        relevantPath = careerPaths["Software Development Path"];
        
        if (jobRoleName.includes("Junior")) currentStage = 1;
        else if (jobRoleName.includes("Senior")) currentStage = 3;
        else if (jobRoleName.includes("Lead")) currentStage = 4;
        else if (jobRoleName.includes("Architect")) currentStage = 5;
        else currentStage = 2;
    } 
    else if (domainName === "Technology" && (subdomainName === "Data Science" || jobRoleName.includes("Data"))) {
        relevantPath = careerPaths["Data Science Path"];
        
        if (jobRoleName.includes("Analyst")) currentStage = 1;
        else if (jobRoleName.includes("Junior")) currentStage = 2;
        else if (jobRoleName.includes("Senior")) currentStage = 4;
        else if (jobRoleName.includes("Lead")) currentStage = 5;
        else currentStage = 3;
    }
    else if (domainName === "Healthcare" && (subdomainName === "Medicine" || jobRoleName.includes("Physician") || jobRoleName.includes("Doctor"))) {
        relevantPath = careerPaths["Medical Career Path"];
        
        if (jobRoleName.includes("Resident")) currentStage = 2;
        else if (jobRoleName.includes("Attending")) currentStage = 3;
        else if (jobRoleName.includes("Specialist")) currentStage = 4;
        else if (jobRoleName.includes("Chief")) currentStage = 5;
        else currentStage = 3;
    }
    else if (domainName === "Business") {
        relevantPath = careerPaths["Business Management Path"];
        
        if (jobRoleName.includes("Trainee")) currentStage = 1;
        else if (jobRoleName.includes("Leader") || jobRoleName.includes("Team")) currentStage = 2;
        else if (jobRoleName.includes("Manager")) currentStage = 3;
        else if (jobRoleName.includes("Director")) currentStage = 4;
        else if (jobRoleName.includes("VP") || jobRoleName.includes("Vice")) currentStage = 5;
        else if (jobRoleName.includes("Chief") || jobRoleName.includes("CEO")) currentStage = 6;
        else currentStage = 2;
    }
    else {
        // If no specific path found, create generic next steps
        let nextStepsHTML = `
            <p>Potential next career steps:</p>
            <ul>
                <li>Senior ${jobRoleName}</li>
                <li>Team Lead or Manager role in ${subdomainName}</li>
                <li>Specialist in a ${subdomainName} niche</li>
                <li>Director of ${subdomainName}</li>
            </ul>
            
            <p>Additional recommendations:</p>
            <ul>
                <li>Pursue advanced certifications in ${subdomainName}</li>
                <li>Develop specialized expertise in emerging areas</li>
                <li>Build management and leadership skills</li>
                <li>Consider further education or specialized training</li>
            </ul>
        `;
        
        nextStepsContainer.innerHTML = nextStepsHTML;
        return;
    }
    
    // Create next steps HTML using the relevant career path
    let nextStepsHTML = '';
    
    if (relevantPath && currentStage >= 0) {
        nextStepsHTML += `
            <div class="career-progression">
                <h4>Career Progression Path:</h4>
                <div class="progression-steps">
        `;
        
        relevantPath.stages.forEach((stage, index) => {
            const isCurrent = index === currentStage;
            const isPast = index < currentStage;
            const isFuture = index > currentStage;
            
            nextStepsHTML += `
                <div class="progression-step ${isCurrent ? 'current' : isPast ? 'past' : 'future'}">
                    <div class="step-number">${index + 1}</div>
                    <div class="step-name">${stage}</div>
                    ${index < relevantPath.stages.length - 1 ? '<div class="step-arrow">→</div>' : ''}
                </div>
            `;
        });
        
        nextStepsHTML += `
                </div>
            </div>
            
            <div class="next-steps-advice">
                <h4>Recommended Next Steps:</h4>
                <ul>
        `;
        
        // Add next steps based on current stage
        if (currentStage < relevantPath.stages.length - 1) {
            nextStepsHTML += `<li>Work toward becoming a <strong>${relevantPath.stages[currentStage + 1]}</strong></li>`;
        }
        
        nextStepsHTML += `
                    <li>Develop expertise in emerging technologies and methodologies in ${subdomainName}</li>
                    <li>Pursue additional certifications or education in specialized areas</li>
                    <li>Build leadership and management skills</li>
                    <li>Expand professional network within the ${domainName} industry</li>
                </ul>
            </div>
        `;
    }
    
    nextStepsContainer.innerHTML = nextStepsHTML;
}

// ------ Search Functions ------

function performSearch() {
    const searchQuery = document.getElementById('search-input').value.trim();
    
    if (searchQuery.length < 2) {
        alert('Please enter at least 2 characters to search.');
        return;
    }
    
    // Store search query and results
    localStorage.setItem('searchQuery', searchQuery);
    
    // Load search results template if not already loaded
    if (!document.getElementById('search-results-page')) {
        loadTemplateContent('search-results');
    }
    
    // Navigate to search results page
    navigateTo('search-results');
    
    // Search in domains, subdomains, job roles, and skills
    const results = {
        domains: [],
        subdomains: [],
        jobRoles: [],
        skills: []
    };
    
    const searchTermLower = searchQuery.toLowerCase();
    
    // Search domains
    for (const domainName in careerDomains) {
        const domain = careerDomains[domainName];
        
        if (domainName.toLowerCase().includes(searchTermLower) || 
            domain.description.toLowerCase().includes(searchTermLower)) {
            results.domains.push({
                name: domainName,
                description: domain.description,
                growth_outlook: domain.growth_outlook
            });
        }
        
        // Search subdomains
        for (const subdomainName in domain.subdomains) {
            const subdomain = domain.subdomains[subdomainName];
            
            if (subdomainName.toLowerCase().includes(searchTermLower) || 
                subdomain.description.toLowerCase().includes(searchTermLower)) {
                results.subdomains.push({
                    name: subdomainName,
                    domain: domainName,
                    description: subdomain.description
                });
            }
            
            // Search job roles
            for (const jobRoleName in subdomain.job_roles) {
                const jobRole = subdomain.job_roles[jobRoleName];
                
                if (jobRoleName.toLowerCase().includes(searchTermLower)) {
                    results.jobRoles.push({
                        title: jobRoleName,
                        subdomain: subdomainName,
                        domain: domainName,
                        education_level: jobRole.education_level,
                        salary_range: jobRole.salary_range
                    });
                }
            }
        }
    }
    
    // Search skills
    for (const category in allSkills) {
        const skills = allSkills[category];
        
        skills.forEach(skill => {
            if (skill.toLowerCase().includes(searchTermLower)) {
                results.skills.push({
                    name: skill,
                    category: category
                });
            }
        });
    }
    
    // Display search results
    displaySearchResults(searchQuery, results);
}

function displaySearchResults(query, results) {
    document.getElementById('search-query').textContent = query;
    
    // Display domain results
    const domainResultsContainer = document.getElementById('domain-results');
    let domainResultsHTML = '<h2>Domains</h2><div class="results-list domains-results">';
    
    if (results.domains.length === 0) {
        domainResultsHTML += '<p class="no-results">No domain results found.</p>';
    } else {
        results.domains.forEach(domain => {
            domainResultsHTML += `
                <div class="result-item" onclick="showDomainDetail('${domain.name}')">
                    <h3>${domain.name}</h3>
                    <p>${domain.description.substring(0, 150)}...</p>
                    <div class="result-meta">
                        <span>Growth Outlook: ${domain.growth_outlook}</span>
                    </div>
                </div>
            `;
        });
    }
    
    domainResultsHTML += '</div>';
    domainResultsContainer.innerHTML = domainResultsHTML;
    
    // Display subdomain results
    const subdomainResultsContainer = document.getElementById('subdomain-results');
    let subdomainResultsHTML = '<h2>Subdomains</h2><div class="results-list subdomains-results">';
    
    if (results.subdomains.length === 0) {
        subdomainResultsHTML += '<p class="no-results">No subdomain results found.</p>';
    } else {
        results.subdomains.forEach(subdomain => {
            subdomainResultsHTML += `
                <div class="result-item" onclick="showSubdomainDetail('${subdomain.name}')">
                    <h3>${subdomain.name}</h3>
                    <p>${subdomain.description.substring(0, 150)}...</p>
                    <div class="result-meta">
                        <span>Domain: ${subdomain.domain}</span>
                    </div>
                </div>
            `;
        });
    }
    
    subdomainResultsHTML += '</div>';
    subdomainResultsContainer.innerHTML = subdomainResultsHTML;
    
    // Display job role results
    const jobRoleResultsContainer = document.getElementById('job-role-results');
    let jobRoleResultsHTML = '<h2>Job Roles</h2><div class="results-list job-roles-results">';
    
    if (results.jobRoles.length === 0) {
        jobRoleResultsHTML += '<p class="no-results">No job role results found.</p>';
    } else {
        results.jobRoles.forEach(jobRole => {
            jobRoleResultsHTML += `
                <div class="result-item" onclick="showJobRoleDetail('${jobRole.domain}', '${jobRole.subdomain}', '${jobRole.title}')">
                    <h3>${jobRole.title}</h3>
                    <div class="result-path">
                        <span>${jobRole.domain}</span> &raquo; <span>${jobRole.subdomain}</span>
                    </div>
                    <div class="result-meta">
                        <span>Education: ${jobRole.education_level}</span>
                        <span>Salary: ${jobRole.salary_range}</span>
                    </div>
                </div>
            `;
        });
    }
    
    jobRoleResultsHTML += '</div>';
    jobRoleResultsContainer.innerHTML = jobRoleResultsHTML;
    
    // Display skill results
    const skillResultsContainer = document.getElementById('skill-results');
    let skillResultsHTML = '<h2>Skills</h2><div class="results-list skills-results">';
    
    if (results.skills.length === 0) {
        skillResultsHTML += '<p class="no-results">No skill results found.</p>';
    } else {
        results.skills.forEach(skill => {
            skillResultsHTML += `
                <div class="result-item">
                    <h3>${skill.name}</h3>
                    <div class="result-meta">
                        <span>Category: ${skill.category}</span>
                    </div>
                </div>
            `;
        });
    }
    
    skillResultsHTML += '</div>';
    skillResultsContainer.innerHTML = skillResultsHTML;
    
    // Show/hide no results message
    const noResultsMessage = document.getElementById('no-results');
    if (results.domains.length === 0 && 
        results.subdomains.length === 0 && 
        results.jobRoles.length === 0 && 
        results.skills.length === 0) {
        noResultsMessage.style.display = 'block';
    } else {
        noResultsMessage.style.display = 'none';
    }
}

// Make certain functions available globally for onclick handlers
window.showDomainDetail = showDomainDetail;
window.showSubdomainDetail = showSubdomainDetail;
window.showJobRoleDetail = showJobRoleDetail;