import { columns } from "./columns"
import { DataTable } from "./data-table"
import { getFirstAidersTreatementByDeclarant } from "@/data/treatment"
import { FirstAiderTreatment } from "@/types"
import { currentUser } from "@/lib/auth"

async function getData(): Promise<FirstAiderTreatment[]> {
    // current user
    const user = await currentUser();
    // Fetch data from your API here.
    return await getFirstAidersTreatementByDeclarant(user?.brokerageCompanyId)
}

export async function Table() {
    const data = await getData()
    return (
        <div className="container mx-auto py-10">
            <DataTable columns={columns} data={data} />
        </div>
    )
}