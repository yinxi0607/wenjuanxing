import {FC, useState} from 'react';
import {
    closestCenter,
    DndContext,
    DragEndEvent,
    KeyboardSensor,
    PointerSensor,
    useSensor,
    useSensors
} from "@dnd-kit/core";
import {
    arrayMove,
    SortableContext,
    sortableKeyboardCoordinates,
    verticalListSortingStrategy
} from "@dnd-kit/sortable";
import Item from "./Item.tsx";

type ComponentType = {
    fe_id : string,
    title: string
}

const DndDemo: FC = () => {
    // const [items, setItems] = useState(['a', 'b', 'c'])
    const [items,setItems] = useState<ComponentType[]>([
        {fe_id:'f1',title:'组件1'},
        {fe_id:'f2',title:'组件2'},
        {fe_id:'f3',title:'组件3'},
        {fe_id:'f4',title:'组件4'},
        {fe_id:'f5',title:'组件5'},
    ])
    const sensors = useSensors(
        useSensor(PointerSensor),
        useSensor(KeyboardSensor, {
            coordinateGetter: sortableKeyboardCoordinates
        })
    )

    function handleDragEnd(event: DragEndEvent) {
        const {active, over} = event
        if (over === null) return
        if (active.id !== over.id) {
            setItems((items) => {
                // const oldIndex = items.indexOf(active.id.toString())
                // const newIndex = items.indexOf(over.id.toString())
                const oldIndex = items.findIndex(c=>c.fe_id===active.id)
                const newIndex = items.findIndex(c=>c.fe_id===over.id)
                return arrayMove(items, oldIndex, newIndex)
            })
        }
    }

    const itemsWithId = items.map(c=>{
        return {
            ...c,
            id:c.fe_id
        }
    })

    return (
        <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragEnd={handleDragEnd}
        >
            <SortableContext
                items={itemsWithId}
                strategy={verticalListSortingStrategy}
            >
                {itemsWithId.map(c => <Item key={c.id} id={c.id} title={c.title}/>)}
            </SortableContext>

        </DndContext>
    );
};

export default DndDemo;