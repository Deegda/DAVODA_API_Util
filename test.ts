import * as b from './dist';

const a = async () => {
    console.log(await b.compareHash('', ''));
};

a();
