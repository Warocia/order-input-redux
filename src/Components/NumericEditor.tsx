import React, { FC } from 'react';
import { EditorProps } from 'react-data-grid'
  
function autoFocusAndSelect(input: HTMLInputElement | null) {
  input?.focus();
  input?.select();
}

export default function NumericEditor<TRow, TSummaryRow>({
    row,
    column,
    onRowChange,
    onClose
}: EditorProps<TRow, TSummaryRow>) {
    const handleValueChanged = (e: React.FocusEvent<HTMLInputElement>) => {
      const newValue = e.target.valueAsNumber;
      if(newValue)
      {
        onRowChange({ ...row, [column.key]: newValue })
        onClose(true)
      }
    };

    return (
      <input
        type="number"
        ref={autoFocusAndSelect}
        defaultValue={row[column.key as keyof TRow] as unknown as string}
        onChange={(event) => onRowChange({ ...row, [column.key]: event.target.value })}
        onBlur={() => onClose(true)}
      />
    );
  }

