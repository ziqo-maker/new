import {NextRequest,NextResponse} from 'next/server'
import { prisma } from '@/lib/prisma'

export async function POST(req: NextRequest) {
    try{
        const userData = await req.json()

        if(!userData || !userData.id){
         return NextResponse.json({error:'Invalid user data'},{status:400})
        }

        let user = await prisma.user.findUnique({
            where: {telegramId: userData.id}
        })

        if(!user){
            user = await prisma.user.create({
                data: {
                    telegramId: userData.id,
                    username: userData.username || '',
                    firstname: userData.first_name || '',
                    lastname: userData.last_name || ''
                }
            })
        }

        return NextResponse.json(user)
    }catch(error){
      console.error('Error user data',error)
      return NextResponse.json({error: 'Internal server'},{status :500})
    }
}