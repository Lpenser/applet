

import creatorPage from './../create';
import PageTService from './pageT.service';

class PageT {
    constructor() {
        this.ser  = new PageTService();
    }

    
}

Page(creatorPage(PageT));
