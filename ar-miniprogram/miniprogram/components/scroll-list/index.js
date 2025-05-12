Component({
  properties: {
    show: {
      value: undefined,
    },
    inputData: {
      type: Array,
      value: [],
    },
    selected: {
      type: String,
      value: "none",
    },
  },
  data: {
    scrollKey: null, //Scroll to the position of the specified key
    innerData: [],
  },
  observers: {
    inputData(data) {
      if (!data || data.length === 0) return;
      this.setData({
        innerData: data,
      });
      //console.log('innerData', this.data.innerData)
      this._setselected(this.data.selected);
      this._setScrollKey(this.data.selected);
    },
    selected(key) {
      this._setselected(key);
      this._setScrollKey(key);
    },
  },
  async attached() {},
  methods: {
    onClickItem(e) {
      const key = e.currentTarget.dataset.key;
      this.triggerEvent("changed", {
        id: key,
      });
      this._setselected(key);
    },
    _setselected(key) {
      let { innerData } = this.data;
      innerData.forEach((s) => {
        if (s.key === key) s.selected = true;
        else s.selected = false;
      });
      this.setData({
        innerData,
      });
    },
    _setScrollKey(key) {
      this.setData({
        scrollKey: key,
      });
    },
  },
});
