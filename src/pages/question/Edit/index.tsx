import {FC} from 'react';
// import useLoadQuestionDataTs from "../../../hooks/useLoadQuestionDataTs.ts";
import styles from './index.module.scss'
import EditCanvas from "./EditCanvas.tsx";
import useLoadQuestionData from "../../../hooks/useLoadQuestionData.ts";

const Edit: FC = () => {
    // const { id='' } = useParams()
    const {loading} = useLoadQuestionData()

    return (
        <div className={styles.container}>
            <div style={{backgroundColor: "white", height: '40px'}}>Header</div>
            <div className={styles["content-wrapper"]}>
                <div className={styles.content}>
                    <div className={styles.left}>Left</div>
                    <div className={styles.main}>
                        <div className={styles["canvas-wrapper"]}>
                            <EditCanvas loading={loading}/>
                        </div>
                    </div>
                    <div className={styles.right}>Right</div>
                </div>
            </div>
        </div>
    );
};

export default Edit;