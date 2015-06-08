function ItemsFactory({React}) {
    var EditItem = require('./EditItem')({React});
    var TextEdit = require('./TextEdit')({React});

    var EditableDailyItem = React.createClass({
        render() {
            return (<div>
                        <input type="checkbox" onChange={this.toggleComplete} checked={this.props.item.get('completed')} />
                        <EditItem
                            editComponent={TextEdit}
                            displayComponent={EditableTaskTextComponent}
                            editAction={this.saveItem}
                            item={this.props.item} />
                    </div>);
        },

        toggleComplete(e) {
            var item = this.props.item.set('completed', e.target.checked);
            this.props.flux.getActions('tasks').saveTask(item);
        },

        saveItem(item) {
            this.props.flux.getActions('tasks').saveTask(item);
        }
    });

    var EditableTodoItem = React.createClass({
        render() {
            return (<div>
                        <input type="checkbox" onClick={this.toggleComplete} checked={this.props.item.completed} />
                        <EditItem
                            editComponent={TextEdit}
                            displayComponent={EditableTaskTextComponent}
                            editAction={this.saveItem}
                            item={this.props.item} />
                    </div>);
        },

        toggleComplete(e) {
            var item = this.props.item.set('completed', e.target.checked);
            this.props.flux.getActions('tasks').saveTask(item);
        },

        saveItem(item) {
            this.props.flux.getActions('tasks').saveTask(item);
        }
    });

    var EditableHabitItem = React.createClass({
        render() {
            var habit = this.props.item,
                upButton = <button type="button">+</button>,
                downButton = <button type="button">-</button>;

            if ( ! habit.get('up')) {
                upButton = "";
            }

            if ( ! habit.get('down')) {
                downButton = "";
            }

            return (<div>
                        {upButton}
                        {downButton}
                        <EditItem
                            editComponent={TextEdit}
                            displayComponent={EditableTaskTextComponent}
                            editAction={this.saveItem}
                            item={this.props.item} />
                    </div>);
        },

        saveItem(item) {
            this.props.flux.getActions('tasks').saveTask(item);
        }
    });

    var EditableTextComponent = React.createClass({
        render() {
            return <span onClick={this.props.onEdit}>{this.props.text}</span>;
        }
    });

    var EditableTaskTextComponent = React.createClass({
        render() {
            return <EditableTextComponent onEdit={this.props.onEdit} text={this.props.item.get('text')} />;
        }
    });

    return {
        EditableHabitItem,
        EditableTodoItem,
        EditableDailyItem
    };
}

export default ItemsFactory;
