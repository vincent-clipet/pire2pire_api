import { PrismaClient, Prisma } from '@prisma/client'

const prisma = new PrismaClient()



const userData: Prisma.UserCreateInput[] =
[
	{ name: 'Alice', password: '123' },
	{ name: 'Bob', password: '456' },
	{ name: 'Charlie', password: '789' },
]

const roleData: Prisma.RoleCreateInput[] =
[
	{ name: 'Admin' },
	{ name: 'Apprenant' },
	{ name: 'Invité' },
]

const permissionData: Prisma.PermissionCreateInput[] =
[
	{ name: 'superuser', description: 'Can do anything' },
	{ name: 'lesson_create', description: 'Create a lesson' },
	{ name: 'lesson_delete', description: 'Delete a lesson' },
	{ name: 'lesson_update', description: 'Update a lesson' },
]

const moduleData: Prisma.ModuleCreateInput[] =
[
	{ name: 'M1' },
	{ name: 'M2' },
	{ name: 'M3' },
]

const lessonData: Prisma.LessonCreateInput[] =
[
	{ name: 'Intro à Python', content: 'Début du cours sur Python ...' },
	{ name: 'Python intermédiaire', content: 'Milieu du cours sur Python ...' },
	{ name: 'Python avancé', content: 'Fin du cours sur Python ...' },
]

const trainingData: Prisma.TrainingCreateInput[] =
[
	{ name: 'Ruby', },
	{ name: 'C#' },
	{ name: 'Python' },
	{ name: 'Javascript (it sucks)' },
]



async function main() {
	console.log(`Start seeding ...`)

	// create roles
	for (const seedData of roleData) {
		const element = await prisma.role.create({
			data: seedData,
		})
		console.log(`Created role with id: ${element.id}`)
	}

	// create users
	for (const seedData of userData) {
		const element = await prisma.user.create({
			data: seedData,
		})
		console.log(`Created user with id: ${element.id}`)
	}

	// create permissions
	for (const seedData of permissionData) {
		const element = await prisma.permission.create({
			data: seedData,
		})
		console.log(`Created permission with id: ${element.id}`)
	}
	
	// create modules
	for (const seedData of moduleData) {
		const element = await prisma.module.create({
			data: seedData,
		})
		console.log(`Created module with id: ${element.id}`)
	}

	// create lesson
	for (const seedData of lessonData) {
		const element = await prisma.lesson.create({
			data: seedData,
		})
		console.log(`Created lesson with id: ${element.id}`)
	}

	// create training
	for (const seedData of trainingData) {
		const element = await prisma.training.create({
			data: seedData,
		})
		console.log(`Created training with id: ${element.id}`)
	}
	
	console.log(`Seeding finished.`)
	
}

main()
.then(async () => {
	await prisma.$disconnect()
})
.catch(async (e) => {
	console.error(e)
	await prisma.$disconnect()
	process.exit(1)
})