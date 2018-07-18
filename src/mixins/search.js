/**
 * 搜索或者重置方法
 *
 * @param {any} tableParams 列表请求参数
 * @param {any} queryParams 搜索请求参数
 * @param {any} type searchOrRest
 * @returns tableParams queryParams _params
 */

export function searchOrReset(tableParams, queryParams, type) {
    if (type == 'reset') {
        for (var key in queryParams) {
            queryParams[key] = '';
        }
    }
    _.extend(tableParams, { limit: tableParams.limit, page: 1 });
    let _params = _.extend({}, queryParams, tableParams);
    _.forEach(_params, (v, k) => {  //去除空的参数
        if (!v) {
            delete _params[k];
        }
    });
    return {
        tableParams,
        queryParams,
        _params
    };
}

export var mixin = {
    mounted() {
        if (this.$route.query.page) {
            this.queryParams = this.$route.query;
            this.tableParams.limit = Number(this.$route.query.limit);
            this.getList(this.$route.query)
        } else {
            this.getList(this.tableParams);
        }
    },
    data() {
        return {
            tableParams: {
                limit: 20,
                page: Number(this.$route.query.page) ? Number(this.$route.query.page) : 1
            },
            queryParams: {},
            total: null,
            tableSource: {
                'default-sort': {
                    prop: '',
                    sort: ''
                }
            }

        }
    },
    created() {
        if (this.$route.query.sortBy) {
            let sort = this.$route.query.sortBy;
            let [prop, order] = sort.split(':');
            order = order == 'ASC' ? 'ascending' : order == 'DESC' ? 'descending' : null;
            const defaultSort = { prop, order }
            this.tableSource['default-sort'] = defaultSort;
        }
    },
    methods: {
        sortChange({ column, prop, order }) {
            let sort = order == 'ascending' ? 'ASC' : order == 'descending' ? 'DESC' : null;
            if (sort) {
                this.queryParams.sortBy = `${prop}:${sort}`;
            } else {
                this.queryParams.sortBy = null;
            };
            this.search();
        },
        handleCurrentChange(val) {

            this.tableParams.page = val

            let _params = _.extend( {},this.queryParams,this.tableParams);
            _.forEach(_params, (v, k) => {
                if (!v) {
                    delete _params[k];
                }
            });
            _params.limit = this.tableParams.limit;
            this.$router.push({ query: _params, path: this.$route.path });
            this.getList(_params);
        },
        sizeChange(val) {
            this.tableParams.limit = val;
            this.getList(Object.assign({}, this.queryParams,this.tableParams));
        },
        search() {
            let {
                tableParams,
                queryParams,
                _params
            } = searchOrReset(this.tableParams, this.queryParams, 'search');
            this.tableParams = tableParams;
            this.$router.push({ path: this.$route.path, query: _params });
            this.getList(_params);
        },
        reset() {
            let {
                tableParams,
                queryParams,
                _params
            } = searchOrReset(this.tableParams, this.queryParams, 'reset');
            this.tableParams = tableParams;
            this.queryParams = queryParams;
            if (this.$route.query.sortBy) {
                _params.sortBy = this.$route.query.sortBy;
                this.queryParams.sortBy = this.$route.query.sortBy;
            }
            this.$router.push({ path: this.$route.path, query: _params });
            if(this.resetData){
                this.resetData();
            }
            this.getList(_params);
        },
    }
}
/**
 * 合计
 * sums mixin
 * @fields  在列表组件中定义需要合计的字段名
 */
export const sums = {
    data() {
        return {
            tableSource: {  //kTable 组件时不需要重复定义
                "show-summary": true,
                "summary-method": params => this.getSummaries(params)
            },
        }
    },
    methods: {
        /**
         * 合计
         * 
         * @param {any} { columns, data }  params 
         * @param {array} fields 
         * @returns 
         */
        getSummaries({ columns, data }) {
            let sums = [];
            columns.forEach((column, index) => {
                if (index === 0) {
                    sums[index] = "总计";
                    return;
                }
                const values = data.map(item => {
                    if (this.fields.includes(column.property)) { //fields
                        return item[column.property];
                    }
                    return NaN;
                });
                if (!values.every(value => isNaN(value))) {
                    sums[index] = values.reduce((prev, curr) => {
                        return prev + curr;
                    }, 0);
                    sums[index] = this.$currency(sums[index]);
                } else {
                    sums[index] = "";
                }
            });
            return sums;
        },
    }
}

