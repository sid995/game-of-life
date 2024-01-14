import Button from 'react-bootstrap/Button';
import ButtonToolbar from 'react-bootstrap/ButtonToolbar';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';

export const Buttons = (props) => {
  const handleSelect = (e) => {
    props.gridSize(e)
  }

  return (
    <div className="center">
      <ButtonToolbar>
        <Button variant="primary" onClick={props.playButton}>
          Play
        </Button>
        <Button variant="primary" onClick={props.pauseButton}>
          Pause
        </Button>
        <Button variant="primary" onClick={props.clear}>
          Clear
        </Button>
        <Button variant="primary" onClick={props.slow}>
          Slow
        </Button>
        <Button variant="primary" onClick={props.fast}>
          Fast
        </Button>
        <Button variant="primary" onClick={props.seed}>
          Seed
        </Button>
        <DropdownButton
          title="Grid Size"
          id="size-menu"
          onSelect={handleSelect}
        >
          <Dropdown.Item eventKey="1">20X10</Dropdown.Item>
          <Dropdown.Item eventKey="2">50X30</Dropdown.Item>
          <Dropdown.Item eventKey="3">70X50</Dropdown.Item>
        </DropdownButton>
      </ButtonToolbar>
    </div>
  );
}