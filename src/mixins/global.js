
import  vuex from "@/store/index"
export const baseFunc = {
    /** ##Message alert
     * ### ('info', 'Текст' )
     * ### info - инфа, фон синиий
     * ### warning - предупреждение, фон желтый
     * ### danger - ошибка, фон красный
     * ### success - успех, фон зеленый
     * @summary Сообщение в хедер
     *
     * @param type
     * @param text
     */
    setAlertMessage: (type, text) => {
        vuex.commit('AlertMessages/setAlert', {type: type, text: text})
    }
}