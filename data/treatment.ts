import { db } from "@/lib/db";
import {unstable_noStore as noStore} from "next/cache"


export async function fetchAllTreatments() {
    noStore()
    
    try {
        return await db.treatment.findMany({select: {
            id: true,
            pickupDate: true,
            pickupLocation: true,
            report: true,
            createdAt: true,
            supportCenter: true,
            declarant: true,
            insuredId: true,
            insured: {
                select: {
                    avatar: true,
                    firstName: true,
                    lastName: true
                }
            }
        }})
    } catch (error) {
        console.error('Database Error: ', error)
        throw new Error('Failed to fetch treatments data.')
    }
}

export async function getFirstAidersTreatementByDeclarant(brokerageCompanyId: string | undefined) {
    noStore()
    try {
        return await db.treatment.findMany({
            where: {
                declarant: 'FIRST_AIDERS',
                brokerageCompanyId
            },
            select: {
                id: true,
                pickupDate: true,
                pickupLocation: true,
                report: true,
                declarant: true,
                createdAt: true,
                supportCenter: true,
                insuredId: true,
                insured: {
                    select: {
                        avatar: true,
                        firstName: true,
                        lastName: true
                    }
                }
            },
        })
        
    } catch (error) {
        console.error('Error lors de la recuperation des traitements: ', error)
        throw new Error('Failed to fetch treatments data.')
    }
}

export async function getHealthcareTreatementByDeclarant(brokerageCompanyId: string | undefined) {
    noStore()
    try {
        return await db.treatment.findMany({
            where: {
                declarant: 'HEALTH_CENTER',
                brokerageCompanyId
            },
            select: {
                id: true,
                pickupDate: true,
                pickupLocation: true,
                report: true,
                declarant: true,
                createdAt: true,
                supportCenter: true,
                insuredId: true,
                insured: {
                    select: {
                        avatar: true,
                        firstName: true,
                        lastName: true
                    }
                }
            },
        })
        
    } catch (error) {
        console.error('Error lors de la recuperation des traitements: ', error)
        throw new Error('Failed to fetch treatments data.')
    }
}