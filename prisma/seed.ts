import { PrismaClient, Prisma } from '@prisma/client'

const prisma = new PrismaClient()





const userData: Prisma.UserCreateInput[] =
[
	{
	  name: 'Alice',
	  password: '123',
	  // role: '1'
	},
	{
	  name: 'Bob',
	  password: '123',
	  // role: '2'
	}
]

const roleData: Prisma.RoleCreateInput[] =
[
	{
	  name: 'Admin',
	},
	{
	  name: 'Apprenant',
	}
]





async function main() {
	console.log(`Start seeding ...`)

	// create roles
	for (const r of roleData) {
		const role = await prisma.role.create({
		  data: r,
		})
		console.log(`Created role with id: ${role.id}`)
	  }

	// create users
	for (const u of userData) {
		const user = await prisma.user.create({
		  data: u,
		})
		console.log(`Created user with id: ${user.id}`)
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