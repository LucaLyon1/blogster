import { PrismaClient } from '@prisma/client'
import { faker } from '@faker-js/faker'

const prisma = new PrismaClient()

function generateTestResult(jobOfferId: string, userId: string, totalQuestions: number) {
    const correctAnswers = faker.number.int({ min: 0, max: totalQuestions })
    const timeUsed = faker.number.int({ min: 300, max: 3600 }) // 5 minutes to 1 hour

    return {
        jobOfferId,
        userId,
        correctAnswers,
        totalQuestions,
        timeUsed,
        appliedAt: faker.date.past(),
    }
}

async function seedTestResults() {
    const jobOffers = await prisma.jobOffer.findMany()
    const users = await prisma.user.findMany()

    for (const jobOffer of jobOffers) {
        const numberOfResults = faker.number.int({ min: 5, max: 50 })
        const totalQuestions = faker.number.int({ min: 10, max: 50 })

        for (let i = 0; i < numberOfResults; i++) {
            const randomUser = faker.helpers.arrayElement(users)
            const testResult = generateTestResult(jobOffer.id, randomUser.id, totalQuestions)

            await prisma.testResult.create({
                data: testResult,
            })
        }
    }

    console.log('Test results seeded successfully')
}

async function main() {
    await seedTestResults()
}

main()
    .catch((e) => {
        console.error(e)
        process.exit(1)
    })
    .finally(async () => {
        await prisma.$disconnect()
    })