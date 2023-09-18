import React from 'react';
import UserStore from '../../../../store/UserStore';
import styles from './form.css';
import InvertBtn from '../../../../UI/InvertBtn/InvertBtn';


export function Form({className}: {className?: string}) {
  return (
    <div className={className}>
      <h2 className='title_exo2_contacts'>Есть вопросы?</h2>
      <form className={styles.contacts_form + ' w-max'} action="">
        <div className={styles.form_item}>
          <input placeholder='Ваше имя' className={styles.form__item_input} type="name" defaultValue={UserStore._user.name} />
          <label className={styles.form__item_label} htmlFor="">*обязательно</label>
        </div>
        <div className={styles.form_item}>
          <input placeholder='Электронная почта' className={styles.form__item_input} type="email" defaultValue={UserStore._user.email} />
          <label className={styles.form__item_label} htmlFor="">*обязательно</label>
        </div>
        <div className={styles.form_item}>
          <textarea placeholder='Ваш вопрос' className={styles.form__item_textarea} name="comment" id="contacts__form_textarea" />
          <label className={styles.form__item_label} htmlFor="contacts__form_textarea">*ответ придет на электронную почту</label>
        </div>
        <InvertBtn className={'py-2 w-[140%] roboto '}>
          Отправить
        </InvertBtn>
      </form>
    </div>
  );
}
