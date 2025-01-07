import { columns } from "./columns"
import { DataTable } from "./data-table"
import { getHealthcareTreatementByDeclarant } from "@/data/treatment"
import { HealthcareTreatment } from "@/types"
import { currentUser } from "@/lib/auth"

async function getData(): Promise<HealthcareTreatment[]> {
    // current user
    const user = await currentUser();
    // Fetch data from your API here.
    return await getHealthcareTreatementByDeclarant(user?.brokerageCompanyId)
}

export async function Table() {
    const data = await getData()
    return (
        <div className="container mx-auto py-10">
            <DataTable columns={columns} data={data} />
        </div>
    )
}