import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
    const financeTemplates = [
        {
            title: 'Mergers & Acquisitions Fundamentals',
            description: 'Test knowledge of key M&A concepts, strategies, and processes',
            industry: 'Finance',
            questions: [
                {
                    description: 'What is the primary difference between a merger and an acquisition?',
                    answer1: 'A merger involves combining two companies, while an acquisition involves one company buying another',
                    answer2: 'A merger is always hostile, while an acquisition is always friendly',
                    answer3: 'Mergers only occur between companies in the same industry, while acquisitions can cross industries',
                    answer4: 'Mergers require government approval, while acquisitions do not',
                    correctAnswer: 1,
                },
                {
                    description: 'What is a "hostile takeover" in M&A?',
                    answer1: 'When a company acquires a competitor to shut it down',
                    answer2: 'When the target company\'s management and board of directors do not approve of the acquisition',
                    answer3: 'When the acquiring company uses illegal means to force the acquisition',
                    answer4: 'When the acquired company\'s employees resist the new management',
                    correctAnswer: 2,
                },
                {
                    description: 'What is the purpose of due diligence in M&A?',
                    answer1: 'To negotiate a better price for the acquisition',
                    answer2: 'To comply with government regulations',
                    answer3: 'To thoroughly investigate and verify the target company\'s financial, legal, and operational status',
                    answer4: 'To prepare marketing materials for the merged company',
                    correctAnswer: 3,
                },
                {
                    description: 'What is a "poison pill" in the context of M&A?',
                    answer1: 'A strategy to make the acquiring company go bankrupt',
                    answer2: 'A defensive tactic used by target companies to make acquisition unattractive or expensive',
                    answer3: 'A clause in the merger agreement that allows either party to back out',
                    answer4: 'A method of financing that involves high-interest loans',
                    correctAnswer: 2,
                },
                {
                    description: 'What is "synergy" in M&A?',
                    answer1: 'The combined company\'s ability to reduce costs',
                    answer2: 'The process of integrating two company cultures',
                    answer3: 'The additional value created by combining two companies that wouldn\'t be achieved independently',
                    answer4: 'The legal process of merging two companies',
                    correctAnswer: 3,
                },
                {
                    description: 'What is a "vertical merger"?',
                    answer1: 'A merger between two companies in the same industry',
                    answer2: 'A merger between a company and its supplier or customer',
                    answer3: 'A merger between two companies in unrelated industries',
                    answer4: 'A merger between two companies of vastly different sizes',
                    correctAnswer: 2,
                },
                {
                    description: 'What is an "earn-out" in M&A transactions?',
                    answer1: 'A bonus paid to employees of the acquired company',
                    answer2: 'A clause allowing the buyer to reclaim money if the acquisition fails',
                    answer3: 'A performance-based payment structure where sellers receive additional compensation if certain targets are met',
                    answer4: 'A tax benefit resulting from the merger',
                    correctAnswer: 3,
                },
                {
                    description: 'What is a "stock-for-stock" merger?',
                    answer1: 'When one company exchanges its shares for the shares of the target company',
                    answer2: 'When both companies sell all their stock and merge the cash',
                    answer3: 'When employees of both companies receive new stock options',
                    answer4: 'When the stock market facilitates the merger',
                    correctAnswer: 1,
                },
                {
                    description: 'What is the role of investment banks in M&A?',
                    answer1: 'To provide loans for the acquisition',
                    answer2: 'To advise on valuation, negotiation, and structuring of the deal',
                    answer3: 'To manage the merged company after the acquisition',
                    answer4: 'To approve or reject the merger',
                    correctAnswer: 2,
                },
                {
                    description: 'What is a "reverse merger"?',
                    answer1: 'When a larger company acquires a smaller one',
                    answer2: 'When a private company acquires a public company to go public quickly',
                    answer3: 'When a merger is cancelled after being announced',
                    answer4: 'When the acquired company\'s management takes control of the acquiring company',
                    correctAnswer: 2,
                },
                {
                    description: 'What is "post-merger integration"?',
                    answer1: 'The process of combining the operations, systems, and cultures of two companies after a merger',
                    answer2: 'The celebration party after a successful merger',
                    answer3: 'The period when merged companies can still legally separate',
                    answer4: 'The financial reporting after a merger is complete',
                    correctAnswer: 1,
                },
                {
                    description: 'What is a "conglomerate merger"?',
                    answer1: 'A merger between two large corporations',
                    answer2: 'A merger between companies in unrelated business areas',
                    answer3: 'A merger that results in a monopoly',
                    answer4: 'A merger between more than two companies',
                    correctAnswer: 2,
                },
                {
                    description: 'What is the "golden parachute" in M&A terms?',
                    answer1: 'A method to safely exit a failing merger',
                    answer2: 'A large bonus given to all employees after a successful merger',
                    answer3: 'Substantial benefits given to top executives if they lose their jobs due to a merger or acquisition',
                    answer4: 'A strategy to make a company appear more valuable before acquisition',
                    correctAnswer: 3,
                },
                {
                    description: 'What is a "tender offer" in M&A?',
                    answer1: 'An offer to buy a company at a discounted price',
                    answer2: 'A public offer to buy shares directly from a company\'s shareholders',
                    answer3: 'An offer to merge made directly to the CEO',
                    answer4: 'The initial offer in a negotiation process',
                    correctAnswer: 2,
                },
                {
                    description: 'What is "goodwill" in M&A accounting?',
                    answer1: 'The positive public perception of the merger',
                    answer2: 'The difference between the purchase price and the fair market value of the acquired company\'s assets',
                    answer3: 'The combined customer base of both companies',
                    answer4: 'The expected future earnings of the merged company',
                    correctAnswer: 2,
                },
                {
                    description: 'What is a "white knight" in hostile takeover situations?',
                    answer1: 'A government regulator who approves the merger',
                    answer2: 'A competing bidder preferred by the target company\'s management',
                    answer3: 'A consultant who advises on merger strategies',
                    answer4: 'The CEO of the acquiring company',
                    correctAnswer: 2,
                },
                {
                    description: 'What is the primary purpose of antitrust regulations in M&A?',
                    answer1: 'To ensure fair pricing of the acquisition',
                    answer2: 'To prevent monopolies and maintain market competition',
                    answer3: 'To protect the jobs of employees in merged companies',
                    answer4: 'To regulate the stock prices of merging companies',
                    correctAnswer: 2,
                },
                {
                    description: 'What is a "merger of equals"?',
                    answer1: 'When two companies of similar size and stature combine',
                    answer2: 'When both companies retain their original names after merging',
                    answer3: 'When the merger results in equal profit sharing',
                    answer4: 'When both companies\' CEOs share the leadership role',
                    correctAnswer: 1,
                },
                {
                    description: 'What is "purchase accounting" in M&A?',
                    answer1: 'The method of paying for an acquisition',
                    answer2: 'The accounting method where the acquirer\'s cost is based on the fair market value of the acquired assets',
                    answer3: 'The process of combining the financial statements of merged companies',
                    answer4: 'The calculation of taxes owed on the merger',
                    correctAnswer: 2,
                },
                {
                    description: 'What is a "breakup fee" in M&A agreements?',
                    answer1: 'The cost of dissolving a merged company',
                    answer2: 'A fee paid by the target company if it backs out of the deal',
                    answer3: 'The cost of laying off redundant employees after a merger',
                    answer4: 'A fee paid to investment banks for facilitating the merger',
                    correctAnswer: 2,
                },
            ],
        },
        // You can add more finance templates here...
    ]
    const communicationTemplates = [
        {
            title: 'Media Communication Management Fundamentals',
            description: 'Test knowledge of key concepts, strategies, and processes in media communication management for a TV company',
            industry: 'Media',
            questions: [
                {
                    description: 'What is the primary role of a Communication Manager in a TV media company?',
                    answer1: 'Developing and managing internal communications between departments',
                    answer2: 'Handling all external communications, including public relations and press releases',
                    answer3: 'Creating TV show content and managing show schedules',
                    answer4: 'Overseeing social media engagement and marketing strategies',
                    correctAnswer: 2,
                },
                {
                    description: 'Which of the following best describes crisis communication in the context of a TV media company?',
                    answer1: 'Communicating scheduling changes to viewers',
                    answer2: 'Engaging with fans on social media platforms',
                    answer3: 'Addressing negative press or controversies involving the network or its shows',
                    answer4: 'Managing relationships with advertisers',
                    correctAnswer: 3,
                },
                {
                    description: 'What is the most effective way to maintain brand consistency across various platforms in a TV media company?',
                    answer1: 'Using the same logo on all communication materials',
                    answer2: 'Ensuring that all messaging, tone, and visuals align with the company’s identity across TV, social media, and press releases',
                    answer3: 'Limiting communication to one platform to avoid confusion',
                    answer4: 'Focusing primarily on TV ads, as they reach the largest audience',
                    correctAnswer: 2,
                },
                {
                    description: 'How can a Communication Manager measure the effectiveness of a PR campaign for a new TV show launch?',
                    answer1: 'By the number of press releases sent out',
                    answer2: 'By the ratings of the first episode',
                    answer3: 'By tracking media coverage, audience engagement, and sentiment on social media',
                    answer4: 'By the number of new followers gained on social media',
                    correctAnswer: 3,
                },
                {
                    description: 'Which communication strategy is most important during a TV network’s rebranding process?',
                    answer1: 'Creating viral content to gain attention',
                    answer2: 'Ensuring a consistent message across all platforms to reflect the new brand image',
                    answer3: 'Focusing solely on internal communications to ensure employees are informed',
                    answer4: 'Publishing press releases every week',
                    correctAnswer: 2,
                },
                {
                    description: 'How should a Communication Manager handle a media inquiry about a controversial topic involving one of the network’s shows?',
                    answer1: 'Decline to comment',
                    answer2: 'Provide a brief and neutral statement to control the narrative',
                    answer3: 'Share internal company information to clarify the situation',
                    answer4: 'Ignore the inquiry and hope it resolves itself',
                    correctAnswer: 2,
                },
                {
                    description: 'What is the key benefit of media monitoring for a Communication Manager at a TV media company?',
                    answer1: 'It helps track competitors’ programming schedules',
                    answer2: 'It provides insights into public sentiment and media coverage about the network',
                    answer3: 'It allows the company to measure ad spending effectiveness',
                    answer4: 'It helps identify which TV shows are most popular',
                    correctAnswer: 2,
                },
                {
                    description: 'What is a common challenge when managing communications for a TV show with a large social media following?',
                    answer1: 'Dealing with fan theories and rumors that may spread misinformation',
                    answer2: 'Creating new TV episodes quickly enough to satisfy demand',
                    answer3: 'Responding to all fan comments personally',
                    answer4: 'Making sure social media posts are timed to coincide with TV ad slots',
                    correctAnswer: 1,
                },
                {
                    description: 'What role does internal communication play in a TV media company?',
                    answer1: 'It ensures that different teams, such as production and marketing, are aligned with the network’s goals and messages',
                    answer2: 'It is only important for the human resources department',
                    answer3: 'It is primarily used to communicate TV schedules to the network’s staff',
                    answer4: 'It replaces external communication entirely',
                    correctAnswer: 1,
                },
                {
                    description: 'Which of the following is most important for a successful media event or press conference?',
                    answer1: 'Having celebrity guests',
                    answer2: 'Coordinating with all media outlets to ensure maximum coverage',
                    answer3: 'Choosing a visually appealing venue',
                    answer4: 'Controlling the message by providing clear talking points and anticipating potential questions',
                    correctAnswer: 4,
                }
            ]
        }
    ];


    for (const template of financeTemplates) {
        await prisma.testTemplate.create({
            data: {
                title: template.title,
                description: template.description,
                industry: template.industry,
                questions: {
                    create: template.questions.map(question => ({
                        ...question,
                    })),
                },
            },
        })
    }
    for (const template of communicationTemplates) {
        await prisma.testTemplate.create({
            data: {
                title: template.title,
                description: template.description,
                industry: template.industry,
                questions: {
                    create: template.questions.map(question => ({
                        ...question,
                    })),
                },
            },
        })
    }
}

main()
    .catch((e) => {
        console.error(e)
        process.exit(1)
    })
    .finally(async () => {
        await prisma.$disconnect()
    })
