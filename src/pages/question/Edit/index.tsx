import {FC} from 'react';
import useLoadQuestionData from "../../../hooks/useLoadQuestionData.ts";

const Edit: FC = () => {
    // const { id='' } = useParams()
    const {loading, data} = useLoadQuestionData()


    return (
        <div>
            <p>Edit Page</p>
            {loading ? <p>loading</p> : <p>{JSON.stringify(data)}</p>}
        </div>
    );
};

export default Edit;