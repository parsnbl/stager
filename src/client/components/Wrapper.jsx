import React from 'react';
import styles from '../stylesheets/Wrapper.module.scss';
import * as Icons from 'react-feather';
import Plan from '../components/Plan.jsx';

const Wrapper = (props) => {
  return(
    <div className={styles.container}>
      <div className={styles.nav}>
        <Icons.AlignJustify className={styles.icons}/>
        <Icons.Home className={styles.icons} />

      </div>
      <div className={styles.sidebar}> 
        <div className={styles.file_explorer_icons}>
          <Icons.Edit className={styles.icons}/>
          <Icons.Save className={styles.icons}/>
          <Icons.FolderPlus className={styles.icons}/>
          <Icons.BarChart className={styles.icons} style={{rotate: '-90deg'}}/>
          <Icons.Download className={styles.icons}/>
        </div>
      </div>
      <div className={styles.tabview}>
        <div className={styles.tabview_tabs}>
          <div className={styles.tabview_top_tab}></div>
          <Icons.Plus className={styles.icons} style={{height: '50%'}}/>
        </div>
        <div className={styles.tabview_content}>
          <Plan />
        </div>
      </div>
    </div>
)};

export default Wrapper;