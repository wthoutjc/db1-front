// Components
import { CTable } from "../../ui/table"
import { Visualization } from "../../test"

// Interfaces
import { DBDataUsers } from "../../../interfaces"

interface Props {
    data: DBDataUsers[]
}

const Client = ({data}: Props) => {
    return (
        <div>
            <Visualization />
            <h1>Client</h1>
            <CTable data={data}></CTable> 
        </div>
    )
}

export {Client}
