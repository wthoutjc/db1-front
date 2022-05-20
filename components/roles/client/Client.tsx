// Components
import { CTable } from "../../ui/table"

// Interfaces
import { DBDataUsers } from "../../../interfaces"

interface Props {
    data: DBDataUsers[]
}

const Client = ({data}: Props) => {
    return (
        <div>
            <h1>Client</h1>
            <CTable data={data}></CTable> 
        </div>
    )
}

export {Client}
