import {FC} from 'react';
// import useLoadQuestionDataTs from "../../../hooks/useLoadQuestionDataTs.ts";
import styles from './index.module.scss'
import EditCanvas from "./EditCanvas.tsx";
import useLoadQuestionData from "../../../hooks/useLoadQuestionData.ts";
import {useDispatch} from "react-redux";
import {changeSelectedId} from "../../../store/componentsReducer";
import LeftPanel from "./LeftPanel.tsx";
import RightPanel from "./RightPanel.tsx";
import EditHeader from "./EditHeader.tsx";

const Edit: FC = () => {
    // const { id='' } = useParams()
    const {loading} = useLoadQuestionData()
    const dispatch = useDispatch()
    function clearSelectedId(){
        dispatch(changeSelectedId(''))
    }
    return (
        <div className={styles.container}>
            <EditHeader/>
            <div className={styles["content-wrapper"]}>
                <div className={styles.content}>
                    <div className={styles.left}>
                        <LeftPanel/>
                    </div>
                    <div className={styles.main} onClick={clearSelectedId}>
                        <div className={styles["canvas-wrapper"]}>
                            <EditCanvas loading={loading}/>
                        </div>
                    </div>
                    <div className={styles.right}>
                        <RightPanel/>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Edit;