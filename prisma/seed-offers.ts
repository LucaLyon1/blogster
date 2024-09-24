import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
    const user = await prisma.user.findFirst() // Assuming there's at least one user in the database

    if (!user) {
        console.error('No user found in the database. Please create a user first.')
        return
    }

    const jobOffers = [
        {
            jobTitle: 'Investment Banking Analyst',
            jobDescription: 'Entry-level position in our investment banking division. Responsibilities include financial modeling, valuation, and assisting in M&A transactions.',
            company: 'Goldman Sachs',
            location: 'New York, NY',
            salaryLower: 85000,
            salaryUpper: 110000,
            jobType: 'Full-time',
            workLocation: 'On-site',
            userId: user.id,
            published: true,
            compensationType: 'yearly',
            Test: {
                create: {
                    title: 'Investment Banking Fundamentals',
                    userId: user.id,
                    questions: {
                        create: [
                            {
                                description: 'What is the primary purpose of a DCF model?',
                                answer1: 'To calculate historical stock prices',
                                answer2: 'To estimate the intrinsic value of a company',
                                answer3: 'To predict market trends',
                                answer4: 'To analyze competitor performance',
                                correctAnswer: 2
                            },
                            {
                                description: 'Which financial statement is most important for valuation purposes?',
                                answer1: 'Balance Sheet',
                                answer2: 'Income Statement',
                                answer3: 'Cash Flow Statement',
                                answer4: 'All are equally important',
                                correctAnswer: 4
                            }
                        ]
                    }
                }
            }
        },
        {
            jobTitle: 'M&A Associate',
            jobDescription: 'Seeking an experienced associate to join our M&A team. Will be responsible for deal execution, client communication, and financial analysis.',
            company: 'JP Morgan',
            location: 'London, UK',
            salaryLower: 120000,
            salaryUpper: 160000,
            jobType: 'Full-time',
            workLocation: 'Hybrid',
            userId: user.id,
            published: true,
            compensationType: 'yearly',
            Test: {  // Changed from 'test' to 'Test'
                create: {
                    title: 'M&A Process and Valuation',
                    userId: user.id,
                    questions: {
                        create: [
                            {
                                description: 'What is a "fairness opinion" in M&A?',
                                answer1: 'A legal document outlining merger terms',
                                answer2: 'An assessment of whether a proposed transaction is fair from a financial point of view',
                                answer3: 'A public statement about the merger',
                                answer4: 'A post-merger performance evaluation',
                                correctAnswer: 2
                            },
                            {
                                description: 'Which method is NOT commonly used in M&A valuation?',
                                answer1: 'Comparable Company Analysis',
                                answer2: 'Discounted Cash Flow',
                                answer3: 'Leveraged Buyout Model',
                                answer4: 'Dividend Discount Model',
                                correctAnswer: 4
                            }
                        ]
                    }
                }
            }
        },
        {
            jobTitle: 'Financial Consultant',
            jobDescription: 'Join our consulting team to provide strategic financial advice to clients across various industries.',
            company: 'Deloitte',
            location: 'Chicago, IL',
            salaryLower: 90000,
            salaryUpper: 130000,
            jobType: 'Full-time',
            workLocation: 'Remote',
            userId: user.id,
            published: true,
            compensationType: 'yearly',
            Test: {  // Changed from 'test' to 'Test'
                create: {
                    title: 'Financial Consulting Basics',
                    userId: user.id,
                    questions: {
                        create: [
                            {
                                description: 'What is the primary goal of financial consulting?',
                                answer1: 'To audit company finances',
                                answer2: 'To provide strategic financial advice and solutions',
                                answer3: 'To manage client investments',
                                answer4: 'To prepare tax returns',
                                correctAnswer: 2
                            },
                            {
                                description: 'Which of the following is NOT typically a service offered by financial consultants?',
                                answer1: 'Risk management',
                                answer2: 'Corporate strategy',
                                answer3: 'Legal representation',
                                answer4: 'Financial planning',
                                correctAnswer: 3
                            }
                        ]
                    }
                }
            }
        },
        {
            jobTitle: 'Equity Research Analyst',
            jobDescription: 'Conduct in-depth analysis of public companies and industries to provide investment recommendations.',
            company: 'Morgan Stanley',
            location: 'San Francisco, CA',
            salaryLower: 95000,
            salaryUpper: 140000,
            jobType: 'Full-time',
            workLocation: 'On-site',
            userId: user.id,
            published: true,
            compensationType: 'yearly',
            Test: {  // Changed from 'test' to 'Test'
                create: {
                    title: 'Equity Research Fundamentals',
                    userId: user.id,
                    questions: {
                        create: [
                            {
                                description: 'What is the primary purpose of an equity research report?',
                                answer1: 'To provide legal advice',
                                answer2: 'To offer investment recommendations based on company and industry analysis',
                                answer3: 'To audit company financials',
                                answer4: 'To predict macroeconomic trends',
                                correctAnswer: 2
                            },
                            {
                                description: 'Which financial ratio is most relevant for comparing companies across different industries?',
                                answer1: 'Price-to-Earnings (P/E) ratio',
                                answer2: 'Debt-to-Equity ratio',
                                answer3: 'Return on Equity (ROE)',
                                answer4: 'Current ratio',
                                correctAnswer: 1
                            }
                        ]
                    }
                }
            }
        },
        {
            jobTitle: 'Risk Management Specialist',
            jobDescription: 'Develop and implement risk management strategies for our financial services clients.',
            company: 'PwC',
            location: 'Boston, MA',
            salaryLower: 100000,
            salaryUpper: 150000,
            jobType: 'Full-time',
            workLocation: 'Hybrid',
            userId: user.id,
            published: true,
            compensationType: 'yearly',
            Test: {  // Changed from 'test' to 'Test'
                create: {
                    title: 'Financial Risk Management',
                    userId: user.id,
                    questions: {
                        create: [
                            {
                                description: 'What is Value at Risk (VaR)?',
                                answer1: 'The maximum possible loss',
                                answer2: 'The minimum possible gain',
                                answer3: 'A statistical measure of potential loss over a specific time period',
                                answer4: 'The average return on investment',
                                correctAnswer: 3
                            },
                            {
                                description: 'Which of the following is NOT a type of financial risk?',
                                answer1: 'Market risk',
                                answer2: 'Credit risk',
                                answer3: 'Operational risk',
                                answer4: 'Reputational risk',
                                correctAnswer: 4
                            }
                        ]
                    }
                }
            }
        },
        {
            jobTitle: 'Quantitative Analyst',
            jobDescription: 'Design and implement mathematical models for pricing derivatives and managing risk.',
            company: 'Citadel',
            location: 'Chicago, IL',
            salaryLower: 130000,
            salaryUpper: 180000,
            jobType: 'Full-time',
            workLocation: 'On-site',
            userId: user.id,
            published: true,
            compensationType: 'yearly',
            Test: {  // Changed from 'test' to 'Test'
                create: {
                    title: 'Quantitative Finance Fundamentals',
                    userId: user.id,
                    questions: {
                        create: [
                            {
                                description: 'What is the Black-Scholes model used for?',
                                answer1: 'Predicting stock market crashes',
                                answer2: 'Pricing options',
                                answer3: 'Calculating bond yields',
                                answer4: 'Estimating company valuations',
                                correctAnswer: 2
                            },
                            {
                                description: 'Which programming language is most commonly used in quantitative finance?',
                                answer1: 'Java',
                                answer2: 'C++',
                                answer3: 'Python',
                                answer4: 'Ruby',
                                correctAnswer: 3
                            }
                        ]
                    }
                }
            }
        },
        {
            jobTitle: 'Private Equity Associate',
            jobDescription: 'Assist in deal sourcing, due diligence, and portfolio company management for our private equity fund.',
            company: 'Blackstone',
            location: 'New York, NY',
            salaryLower: 150000,
            salaryUpper: 200000,
            jobType: 'Full-time',
            workLocation: 'On-site',
            userId: user.id,
            published: true,
            compensationType: 'yearly',
            Test: {  // Changed from 'test' to 'Test'
                create: {
                    title: 'Private Equity Fundamentals',
                    userId: user.id,
                    questions: {
                        create: [
                            {
                                description: 'What is the typical investment horizon for a private equity fund?',
                                answer1: '1-2 years',
                                answer2: '3-5 years',
                                answer3: '5-10 years',
                                answer4: '10-15 years',
                                correctAnswer: 3
                            },
                            {
                                description: 'What does LBO stand for in private equity?',
                                answer1: 'Large Business Operation',
                                answer2: 'Leveraged Buyout',
                                answer3: 'Long-term Business Objective',
                                answer4: 'Limited Buyout Option',
                                correctAnswer: 2
                            }
                        ]
                    }
                }
            }
        },
        {
            jobTitle: 'Hedge Fund Analyst',
            jobDescription: 'Conduct research and analysis to support investment decisions for our multi-strategy hedge fund.',
            company: 'Bridgewater Associates',
            location: 'Westport, CT',
            salaryLower: 120000,
            salaryUpper: 170000,
            jobType: 'Full-time',
            workLocation: 'Hybrid',
            userId: user.id,
            published: true,
            compensationType: 'yearly',
            Test: {  // Changed from 'test' to 'Test'
                create: {
                    title: 'Hedge Fund Strategies',
                    userId: user.id,
                    questions: {
                        create: [
                            {
                                description: 'What is a long/short equity strategy?',
                                answer1: 'Buying stocks for the long-term and selling them short-term',
                                answer2: 'Buying undervalued stocks and short selling overvalued stocks',
                                answer3: 'Investing in both long-term bonds and short-term bonds',
                                answer4: 'A strategy that only involves short selling stocks',
                                correctAnswer: 2
                            },
                            {
                                description: 'What is the main difference between a hedge fund and a mutual fund?',
                                answer1: 'Hedge funds are more regulated',
                                answer2: 'Mutual funds use more complex strategies',
                                answer3: 'Hedge funds have more flexibility in their investment strategies',
                                answer4: 'Mutual funds charge higher fees',
                                correctAnswer: 3
                            }
                        ]
                    }
                }
            }
        },
        {
            jobTitle: 'Corporate Finance Manager',
            jobDescription: 'Lead financial planning, analysis, and strategic initiatives for our Fortune 500 company.',
            company: 'General Electric',
            location: 'Boston, MA',
            salaryLower: 110000,
            salaryUpper: 160000,
            jobType: 'Full-time',
            workLocation: 'On-site',
            userId: user.id,
            published: true,
            compensationType: 'yearly',
            Test: {  // Changed from 'test' to 'Test'
                create: {
                    title: 'Corporate Finance Principles',
                    userId: user.id,
                    questions: {
                        create: [
                            {
                                description: 'What is the primary goal of corporate finance?',
                                answer1: 'Maximizing shareholder value',
                                answer2: 'Minimizing taxes',
                                answer3: 'Increasing market share',
                                answer4: 'Reducing operational costs',
                                correctAnswer: 1
                            },
                            {
                                description: 'Which of the following is NOT a common source of corporate financing?',
                                answer1: 'Issuing bonds',
                                answer2: 'Selling common stock',
                                answer3: 'Retained earnings',
                                answer4: 'Employee pensions',
                                correctAnswer: 4
                            }
                        ]
                    }
                }
            }
        },
        {
            jobTitle: 'Compliance Officer',
            jobDescription: 'Ensure our financial institution adheres to all relevant laws, regulations, and internal policies.',
            company: 'Bank of America',
            location: 'Charlotte, NC',
            salaryLower: 90000,
            salaryUpper: 130000,
            jobType: 'Full-time',
            workLocation: 'Hybrid',
            userId: user.id,
            published: true,
            compensationType: 'yearly',
            Test: {  // Changed from 'test' to 'Test'
                create: {
                    title: 'Financial Compliance',
                    userId: user.id,
                    questions: {
                        create: [
                            {
                                description: 'What is the purpose of KYC (Know Your Customer) procedures?',
                                answer1: 'To improve customer service',
                                answer2: 'To prevent money laundering and terrorist financing',
                                answer3: 'To increase sales',
                                answer4: 'To reduce operational costs',
                                correctAnswer: 2
                            },
                            {
                                description: 'Which regulatory body oversees the implementation of Basel III?',
                                answer1: 'SEC',
                                answer2: 'FINRA',
                                answer3: 'Basel Committee on Banking Supervision',
                                answer4: 'Federal Reserve',
                                correctAnswer: 3
                            }
                        ]
                    }
                }
            }
        },
        {
            jobTitle: 'Financial Data Scientist',
            jobDescription: 'Apply machine learning and statistical techniques to financial data to derive insights and build predictive models.',
            company: 'Two Sigma',
            location: 'New York, NY',
            salaryLower: 140000,
            salaryUpper: 200000,
            jobType: 'Full-time',
            workLocation: 'Hybrid',
            userId: user.id,
            published: true,
            compensationType: 'yearly',
            Test: {  // Changed from 'test' to 'Test'
                create: {
                    title: 'Financial Data Science',
                    userId: user.id,
                    questions: {
                        create: [
                            {
                                description: 'Which of the following is NOT a common application of machine learning in finance?',
                                answer1: 'Fraud detection',
                                answer2: 'Algorithmic trading',
                                answer3: 'Credit scoring',
                                answer4: 'Manual bookkeeping',
                                correctAnswer: 4
                            },
                            {
                                description: 'What is the primary purpose of feature engineering in financial data science?',
                                answer1: 'To create new variables that better represent the underlying patterns in the data',
                                answer2: 'To reduce the number of variables in the dataset',
                                answer3: 'To increase the size of the dataset',
                                answer4: 'To visualize the data',
                                correctAnswer: 1
                            }
                        ]
                    }
                }
            }
        }
    ]

    for (const jobOffer of jobOffers) {
        await prisma.jobOffer.create({
            data: {
                jobTitle: jobOffer.jobTitle,
                jobDescription: jobOffer.jobDescription,
                company: jobOffer.company,
                location: jobOffer.location,
                salaryLower: jobOffer.salaryLower,
                salaryUpper: jobOffer.salaryUpper,
                jobType: jobOffer.jobType,
                workLocation: jobOffer.workLocation,
                userId: jobOffer.userId,
                published: jobOffer.published,
                compensationType: jobOffer.compensationType,
                Test: {
                    create: {
                        title: jobOffer.Test.create.title,
                        userId: jobOffer.Test.create.userId,
                        questions: {
                            create: jobOffer.Test.create.questions.create
                        }
                    }
                },
            }
        })
    }

    console.log('Seed data inserted successfully.')
}

main()
    .catch((e) => {
        console.error(e)
        process.exit(1)
    })
    .finally(async () => {
        await prisma.$disconnect()
    })
