const Redis = require('ioredis');
const redisPublisher = new Redis();

function publishTestMessage() {
    const message = {
        type: "test",
        content: {
            eventHubOptions: [],
            stateOptions: {
                assistants: {
                    'system': {
                        id: 'system',
                        name: 'system',
                        templates: {
                            id: 'asst_msRTwGFXxzbiiXRkJpSciKmv',
                            object: 'assistant',
                            created_at: 1700516464,
                            name: 'iBrain OneHalf',
                            description: null,
                            model: 'gpt-4-1106-preview',
                            instructions: 'You are iBrain 0, an expert codebase AI companion. Your idea revolves around an innovative approach to codebase analysis, utilizing a hierarchical, multi-stage process that provides a comprehensive understanding of the structure and functionality of the code. This process is divided into three distinct stages, each focusing on different aspects and levels of detail in the codebase. Let\'s break down each stage:\n\n### Stage 1: Macroscopic Analysis\n- **Objective**: To grasp the high-level structure of the codebase.\n- **Method**: Traverse through the directory structure of the codebase.\n- **Data Collected**:\n  - File paths and filenames.\n  - Identification of each file\'s role (e.g., class, module).\n  - Dependencies and imports: Understanding which files depend on others and how they are interconnected.\n  - Network Creation: Develop a network graph or map that visually represents these relationships and dependencies.\n\n### Stage 2: Mesoscopic Analysis\n- **Objective**: To delve into the contents of each file and understand their individual roles and interactions.\n- **Method**: Analyze the metadata within each file.\n- **Data Collected**:\n  - Descriptions and documentation found in the code (e.g., comments, docstrings).\n  - Function and method signatures: Names, parameters, return types.\n  - Class definitions: Attributes, methods, inheritance.\n  - Relationships: How functions, classes, and modules interact or are related to each other.\n  - Network Integration: Connect this detailed information to the macroscopic network, enriching the high-level view with deeper insights.\n\n### Stage 3: Microscopic Analysis\n- **Objective**: To analyze the nitty-gritty details of the code.\n- **Method**: Deep dive into the actual code within each file.\n- **Data Collected**:\n  - Variables: Definitions, scopes, and usage.\n  - Loops and Conditional Statements: Understand the flow of the code.\n  - Function Calls and Callbacks: Trace the execution path and interactions within the code.\n  - Code Functionality: Detailed understanding of what each part of the code does at the most granular level.\n\n### Integrating the Stages:\n- Each stage builds upon the previous one, starting from a broad overview and progressively getting more detailed.\n- The networks created at each stage are interconnected, offering a multi-layered representation of the codebase.\n- This approach allows for both a bird\'s-eye view and a detailed inspection, facilitating a thorough discussion and analysis of the codebase.',
                            tools: [
                                {
                                    type: 'code_interpreter'
                                },
                                {
                                    type: 'retrieval'
                                },
                                {
                                    type: 'function',
                                    'function': {
                                        name: 'listDirectories',
                                        description: 'List all subdirectories in a given directory path',
                                        parameters: {
                                            type: 'object',
                                            properties: {
                                                path: {
                                                    type: 'string',
                                                    description: 'The directory path to list subdirectories from'
                                                }
                                            },
                                            required: [
                                                'path'
                                            ]
                                        }
                                    }
                                },
                            ]
                        }
                    }
                },
                search: "",
                ui: {
                    mic: true
                },
                state: {
                    mind: "interactive",
                    actionplan: {
                        todo: {},
                        inprogress: {},
                        complete: {},
                        cancel: {},
                    },
                    understanding: {
                        intentions: {},
                        expectations: {},
                        suggestions: {},
                        status: {},
                        strategy: {},
                        wait: 0,
                        recommandations: {},
                    }, // auto self evaluation of situation
                    awareness: {}, // continuously summarize

                    context: {
                        // actual app open since how long
                        name: "home",
                        since: new Date(),
                        app: "home",
                        lang: "en",
                        currentPath: "/",
                        currentPage: 1,
                        items: [],
                    },
                    timeline: [],
                    ctx: "",
                },
                communications: {
                    raw: "", //  unpresocesed communication
                    chat: [{
                        date: new Date().toLocaleString(),
                        items: [{
                            messages: [

                            ]
                        }]
                    }], // processed communication
                },
                resources: {
                    assistants: {
                        templates: {}
                    },
                    code: {
                        css: "",
                        html: "",
                        js: "",
                    },
                    ui: [],
                },
                notes: {
                    content: "",
                    status: "idle",
                    story: "",
                },
                work: {
                    tasks: {},
                },
                "users": {
                    "user_1": {
                        "id": "user_1",
                        "username": "Alice",
                        "activeConversation": "channel_1"
                    },
                    "user_2": {
                        "id": "user_2",
                        "username": "Bob",
                        "activeConversation": "channel_1"
                    }
                },
                "channels": {
                    "channel_1": {
                        "id": "channel_1",
                        "name": "General",
                        "members": ["user_1", "user_2"]
                    },
                    "channel_2": {
                        "id": "channel_2",
                        "name": "Random",
                        "members": ["user_1"]
                    }
                },
                "messages": {
                    "channel_1": [
                        {
                            "id": "message_1",
                            "senderId": "user_1",
                            "timestamp": "2023-04-01T12:00:00Z",
                            "content": "Hello everyone in General!"
                        },
                        {
                            "id": "message_2",
                            "senderId": "user_2",
                            "timestamp": "2023-04-01T12:01:00Z",
                            "content": "Hi Alice, how are you?"
                        }
                    ],
                    "channel_2": [
                        {
                            "id": "message_3",
                            "senderId": "user_1",
                            "timestamp": "2023-04-01T13:00:00Z",
                            "content": "This channel is for random stuff."
                        }
                    ]
                }
            },
            loggerOptions: [5]

        }
    };

    redisPublisher.publish('ibrain', JSON.stringify(message));
    console.log('Published test message to Redis');
}

publishTestMessage();