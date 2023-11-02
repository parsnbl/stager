
class DateTime extends Date {
  constructor(...args) {
    super(...args)
    this.TimezoneAware = false;
  }
  makeTimezoneAware = () => {
    if (!this.TimezoneAware) {
      const offset = this.getTimezoneOffset();
      const currentMinutes = this.getMinutes();
      this.setMinutes(currentMinutes + offset);
      this.TimezoneAware = true;
      return this;
    } else {
      throw new Error(`DateTime of ${this} is already timezone aware.`);
    }
    
  }
  getDaysFromYearStart = () => {
    const yearStart = new Date(this.getFullYear(), 0 , 1);
    return Math.floor((this - yearStart) / (24 * 60 * 60 * 1000)) + 1;
  }
  getDaysFrom = (dateObj) => {
    const difference = Math.abs(this-dateObj);
    return Math.floor((difference) / (24 * 60 * 60 * 1000));
  }
  getWeekNumber = () => Math.ceil(this.getDaysfromYearStart() / 7);
  addDays = (days) => {
    const daysFromStart = this.getDaysFromYearStart()
    this.setMonth(0);
    this.setDate(1);
    this.setDate(daysFromStart + days + 1);
    return this;
  }
  addTime = (hours, minutes, seconds, ms) => {
    hours = hours !== undefined ? hours : 0;
    minutes = minutes !== undefined ? minutes : 0;
    seconds = seconds !== undefined ? seconds : 0;
    ms = ms !== undefined ? seconds : 0;
    const origHours = this.getHours();
    const origMinutes = this.getMinutes();
    const origSeconds = this.getSeconds();
    const origMs = this.getMilliseconds();
    this.setHours(
      hours+origHours, 
      minutes+origMinutes, 
      seconds+origSeconds, 
      ms+origMs
    );
    return this;
  };
  clone = () => {
    return new DateTime(this.getTime());
  };
  makeDateHeader = () => {
    return this.toLocaleString('en-us',{month: '2-digit', day: '2-digit'});
  };

}

const DAILY = 'DAILY';
const WEEKLY = 'WEEKLY';
const MONTHLY = 'MONTHLY';
const QUARTERLY = 'QUARTERLY';
export const CONSTS = {
  DAILY,
  WEEKLY,
  MONTHLY,
  QUARTERLY
};

export default DateTime;