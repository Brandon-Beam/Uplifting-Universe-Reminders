export default function Header(props) {
  const data = props.data
  const completed = data.filter(item => {
    return item.completed === true;
  });

  console.log(completed)

  return (
    <div>
      {completed.length === 0 ? <h2>You can do it!! I believe in you!!</h2> : <div>{completed.length === 1 ? <h2>You Completed {completed.length} Task!! Way to go!!</h2> : <h2>You Completed {completed.length} Tasks!! Incredible</h2>}</div>}
    </div>
  )
};